import "server-only";

import { db } from "@/db";
import { roles, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifySession } from "./session";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { UnauthorizedError } from "../error/auth";
import { NotFoundError } from "../error/common";

export const createNewUser = async (params: {
	id: string;
	email: string;
	createdAt?: string;
	displayName?: string;
	picture?: string;
}) => {
	const [user] = await db.select().from(users).where(eq(users.id, params.id));

	if (user) {
		return { id: user.id };
	}

	return await db.transaction(async (tx) => {
		const [role] = await tx
			.select()
			.from(roles)
			.where(eq(roles.name, "member"));

		const [newUser] = await tx
			.insert(users)
			.values({ ...params, roleId: role.id })
			.returning({ id: users.id });

		return newUser;
	});
};

export const getUser = cache(async () => {
	const user = await verifySession();
	return unstable_cache(
		async () => {
			const [result] = await db
				.select()
				.from(users)
				.innerJoin(roles, eq(users.roleId, roles.id))
				.where(eq(users.id, user.userId));

			return { ...result.users, role: result.roles.name };
		},
		[user.userId],
		{
			tags: [user.userId],
			revalidate: 60,
		}
	);
});

export const getAllUsers = async () => {
	try {
		const session = await verifySession();

		const [role] = await db
			.select({ name: roles.name })
			.from(roles)
			.innerJoin(users, eq(roles.id, users.roleId))
			.where(eq(users.id, session.userId));

		if (role.name !== "admin") {
			throw new UnauthorizedError("Allow only admins to read users");
		}

		const result = await db
			.select()
			.from(users)
			.innerJoin(roles, eq(users.roleId, roles.id));

		const listUsers = result.map((data) => ({
			...data.users,
			role: data.roles.name,
		}));

		return { data: listUsers, error: null };
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return { error: error.message, data: null };
		}

		return { error: "Fail to get users", data: null };
	}
};

export const updateUserRole = async (params: {
	updateUserId: string;
	roleName: string;
}) => {
	try {
		const session = await verifySession();

		const [role] = await db
			.select({ name: roles.name })
			.from(roles)
			.innerJoin(users, eq(roles.id, users.roleId))
			.where(eq(users.id, session.userId));

		if (role.name !== "admin") {
			throw new UnauthorizedError("Allow only admins update user role");
		}

		const [existingRole] = await db
			.select()
			.from(roles)
			.where(eq(roles.name, params.roleName));

		if (!existingRole) {
			throw new Error("Role not found");
		}

		await db
			.update(users)
			.set({ roleId: existingRole.id })
			.where(eq(users.id, params.updateUserId));

		return { error: null, data: "Success" };
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			return {
				error: {
					message: error.message,
					code: 403,
				},
				data: null,
			};
		}

		if (error instanceof NotFoundError) {
			return {
				error: {
					message: error.message,
					code: 404,
				},
				data: null,
			};
		}

		return {
			error: {
				message: "Fail to update user role",
				code: 500,
			},
			data: null,
		};
	}
};
