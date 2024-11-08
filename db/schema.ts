import { pgTable, uuid, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
		.defaultNow()
		.notNull(),
	displayname: text(),
	email: text().notNull(),
	picture: text(),
});
