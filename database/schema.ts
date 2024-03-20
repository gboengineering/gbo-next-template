import {
  pgTable,
  timestamp,
  uuid,
  text,
  varchar,
  inet,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  role: text("role").$type<"admin" | "user">().default("user"),
  username: text("username").unique(),
  email: text("email").unique(),
  password: text("password"),
  ipAddress: inet("ip_address"),
  source: varchar("source", { length: 20 }).default("website"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
