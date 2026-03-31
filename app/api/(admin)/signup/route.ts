// app/api/signup/route.ts
import { users } from "@/db/schema";
import { db } from "@/db_connection";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, password, confirmPassword } = await request.json();

        // Validate required fields
        if (!fullName || !email || !password || !confirmPassword) {
            return NextResponse.json({
                error: "All fields are required"
            }, { status: 400 });
        }

        // Check if password and confirm_password match
        if (password !== confirmPassword) {
            return NextResponse.json({
                error: "Passwords do not match"
            }, { status: 400 });
        }

        // Validate password strength
        if (password.length < 6) {
            return NextResponse.json({
                error: "Password must be at least 6 characters long"
            }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await db.select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json({
                error: "User with this email already exists"
            }, { status: 409 });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Insert user into database
        const [newUser] = await db.insert(users).values({
            name: fullName,
            email,
            password: hash,
        }).returning();

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: newUser.id, 
                email: newUser.email,
                name: newUser.name 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '7d' }
        );

        // Create response with cookie
        const response = NextResponse.json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        }, { status: 201 });

        // Set cookie in response
        response.cookies.set({
            name: 'auth_token',
            value: token,
            httpOnly: true, // Important: prevents XSS attacks
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
            path: '/',
        });

        return response;

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({
            error: "Internal server error"
        }, { status: 500 });
    }
}