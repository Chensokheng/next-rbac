import "server-only";

import { db } from "@/src/drizzle";
import { roles, users } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";
export const commonPolicy = {
	isAdmin: async (userId: string) => {
		const [user] = await db
			.select({
				role: roles.role,
			})
			.from(users )
			.innerJoin(roles, eq(users.roleId, roles.id))
			.where(eq(users.id, userId));
		return user.role === "admin";
	},
};
