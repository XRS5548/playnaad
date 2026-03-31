// app/api/login/route.ts
import { users } from "@/db/schema";
import { db } from "@/db_connection";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const { email, password, rememberMe } = await request.json();

        // Validate required fields
        if (!email || !password) {
            return NextResponse.json({
                error: "Email and password are required"
            }, { status: 400 });
        }

        // Find user by email
        const [user] = await db.select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (!user) {
            return NextResponse.json({
                error: "Invalid email or password"
            }, { status: 401 });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({
                error: "Invalid email or password"
            }, { status: 401 });
        }

        // Set token expiry based on remember me
        const expiresIn = rememberMe ? '30d' : '7d';
        const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7; // 30 days or 7 days in seconds

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.id, 
                email: user.email,
                name: user.name 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn }
        );

        // Create response with user data (excluding password)
        const response = NextResponse.json({
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            }
        }, { status: 200 });

        // Set cookie in response
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: maxAge,
            path: '/',
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 });
    }
}