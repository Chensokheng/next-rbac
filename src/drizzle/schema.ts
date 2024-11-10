import { pgTable, uuid, timestamp, text, pgEnum } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	displayName: text("display_name"),
	email: text("email").notNull().unique(),
	picture: text("picture"),
	roleId: uuid("role_id")
		.references(() => roles.id)
		.notNull(),
});
export type InsertUser = typeof users.$inferInsert;

export const roleEnum = pgEnum("role", ["admin", "user", "guest"]);
export const roles = pgTable("roles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	role: roleEnum("role").notNull(),
});
