import {
  pgTable,
  serial,
  varchar,
  text,
  integer,
  decimal,
  boolean,
  timestamp,
  primaryKey
} from "drizzle-orm/pg-core";

/* ================= USERS ================= */
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  email: varchar("email", { length: 150 })
    .notNull()
    .unique(),

  phone: varchar("phone", { length: 15 }).unique(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow()
});

/* ================= COLLECTIONS ================= */
export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 100 }).notNull(),

  description: text("description"),

  // ✅ FIX: self reference type issue solved
  parentId: integer("parent_id").references(
    (): any => collections.id,
    { onDelete: "cascade" }
  )
});

/* ================= PRODUCTS ================= */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  name: varchar("name", { length: 150 }).notNull(),

  description: text("description"),

  price: decimal("price", { precision: 10, scale: 2 }).notNull(),

  stock: integer("stock").default(0),

  image: text("image"),
  discountPercentage: integer("discount_percentage").default(0),

  collectionId: integer("collection_id").references(
    () => collections.id,
    { onDelete: "set null" }
  ),

  createdAt: timestamp("created_at").defaultNow()
});

/* ================= RATINGS ================= */
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade"
  }),

  productId: integer("product_id").references(() => products.id, {
    onDelete: "cascade"
  }),

  rating: integer("rating").notNull(), // 1–5

  review: text("review"),

  // ✅ NEW FIELD
  attachmentUrl: text("attachment_url"),

  createdAt: timestamp("created_at").defaultNow()
});

/* ================= PRODUCT LIKES ================= */
export const productLikes = pgTable(
  "product_likes",
  {
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade"
    }),

    productId: integer("product_id").references(() => products.id, {
      onDelete: "cascade"
    })
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] })
  })
);

/* ================= CART ================= */
export const carts = pgTable(
  "carts",
  {
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade"
    }),

    productId: integer("product_id").references(() => products.id, {
      onDelete: "cascade"
    }),

    quantity: integer("quantity").notNull().default(1)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.productId] })
  })
);

/* ================= ORDERS ================= */
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade"
  }),

  totalAmount: decimal("total_amount", {
    precision: 10,
    scale: 2
  }).notNull(),

  status: varchar("status", { length: 50 }).default("pending"),

  createdAt: timestamp("created_at").defaultNow()
});

/* ================= ORDER ITEMS ================= */
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: integer("order_id").references(() => orders.id, {
    onDelete: "cascade"
  }),

  productId: integer("product_id").references(() => products.id, {
    onDelete: "set null"
  }),

  quantity: integer("quantity").notNull(),

  price: decimal("price", { precision: 10, scale: 2 }).notNull()
});

/* ================= DISCOUNTS ================= */
export const discounts = pgTable("discounts", {
  id: serial("id").primaryKey(),

  collectionId: integer("collection_id").references(
    () => collections.id,
    { onDelete: "cascade" }
  ),

  percentage: integer("percentage").notNull(),

  isActive: boolean("is_active").default(true)
});

/* ================= USER DISCOUNTS ================= */
export const userDiscounts = pgTable("user_discounts", {
  id: serial("id").primaryKey(),

  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade"
  }),

  discountId: integer("discount_id").references(() => discounts.id, {
    onDelete: "cascade"
  }),

  used: boolean("used").default(false)
});