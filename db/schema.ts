import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	display_name: text("display_name"),
	email: text("email").notNull(),
	picture: text("picture"),
	roleId: uuid("role_id").references(() => roles.id),
});

export const roles = pgTable("roles", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
});
