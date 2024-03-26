import {
  pgTable,
  timestamp,
  uuid,
  text,
  varchar,
  inet,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import type { InferSelectModel } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  role: text("role").$type<"admin" | "user">().default("user"),
  username: text("username").unique(),
  email: text("email").unique(),
  password: text("password"),
  ipAddress: inet("ip_address"),
  source: varchar("source", { length: 20 }).default("website"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

export type User = InferSelectModel<typeof users>;

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  users: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
