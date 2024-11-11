import "server-only";

import { db } from "@/src/drizzle";
import { roles, users } from "@/src/drizzle/schema";
import { TCreateNewUser } from "@/src/zod-schema/user";
import { eq, sql } from "drizzle-orm";
import { ROLES } from "@/src/constant";
import { unstable_cache } from "next/cache";

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
	getCacheUser: async (id: string) => {
		const cb = unstable_cache(
			async () => {
				const [result] = await db
					.select()
					.from(users)
					.innerJoin(roles, eq(users.roleId, roles.id))
					.where(eq(users.id, id));
				return result;
			},
			[id],
			{
				tags: [id],
				revalidate: 60,
			}
		);

		return cb();
	},
	getAllUser: async () => {
		const result = await db
			.select()
			.from(users)
			.innerJoin(roles, eq(users.roleId, roles.id));
		return result;
	},
	updateUserRole: async (params: { id: string; role: string }) => {
		await db
			.update(users)
			.set({ roleId: sql`(select id from roles where role = ${params.role})` })
			.where(eq(users.id, params.id));
	},
};
