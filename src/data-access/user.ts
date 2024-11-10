import "server-only";

import { eq, sql } from "drizzle-orm";
import { roles, users } from "@/src/drizzle/schema";
import { ROLES } from "@/src/constant";
import { db } from "@/src/drizzle";
import { DatabaseError } from "@/src/error/common";
import { unstable_cache } from "next/cache";

export const dbCreateNewLoginUser = async (user: {
	email: string;
	id: string;
	createdAt?: string | undefined;
	display_name?: string | undefined;
	picture?: string | undefined;
}): Promise<{ id: string }> => {
	try {
		const existingUser = await db.query.users.findFirst({
			columns: {
				id: true,
			},
			where: eq(users.id, user.id),
		});

		if (existingUser) {
			return { id: existingUser.id };
		}

		const [result] = await db
			.insert(users)
			.values({
				...user,
				roleId: sql`(select id from roles where role = ${ROLES.DEFAULT})`,
			})
			.returning({ id: users.id });

		return result;
	} catch (error) {
		throw new DatabaseError("Failed to create new user " + error);
	}
};

export const dbGetUserById = async (id: string) => {
	const cb = unstable_cache(
		async () => {
			try {
				const [result] = await db
					.select({
						user: users,
						role: roles.role,
					})
					.from(users)
					.innerJoin(roles, eq(users.roleId, roles.id))
					.where(eq(users.id, id));
				return { ...result.user, role: result.role };
			} catch (error) {
				throw new DatabaseError("Failed to get user by id " + error);
			}
		},
		[id],
		{
			tags: [id],
		}
	);

	return cb();
};
