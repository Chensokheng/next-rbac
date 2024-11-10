import "server-only";

import { db } from "@/src/drizzle";
import { users } from "@/src/drizzle/schema";
import { TCreateNewUser } from "@/src/zod-schema/user";
import { eq, sql } from "drizzle-orm";
import { ROLES } from "@/src/constant";

export const userDataAccess = {
	createNewLoginUser: async (params: TCreateNewUser) => {
		const existingUser = await db.query.users.findFirst({
			columns: {
				id: true,
			},
			where: eq(users.id, params.id),
		});

		if (existingUser) {
			return existingUser;
		}

		const [user] = await db
			.insert(users)
			.values({
				...params,
				roleId: sql`(select id from roles where role = ${ROLES.DEFAULT})`,
			})
			.returning({ id: users.id });
		return user;
	},
};
