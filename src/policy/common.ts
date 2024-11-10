import { db } from "@/src/drizzle";
import { eq } from "drizzle-orm";
import { roles, users } from "@/src/drizzle/schema";

import { NotFoundError } from "@/src/error/common";
import { UnauthorizedError } from "@/src/error/auth";

import { verifySession } from "@/src/third-party/auth-session";

export const isAdmin = async (userId: string) => {
	const [user] = await db
		.select({
			roleName: roles.role,
		})
		.from(users)
		.innerJoin(roles, eq(users.roleId, roles.id))
		.where(eq(users.id, userId));

	if (!user) {
		throw new NotFoundError("User not found");
	}

	return user.roleName === "admin";
};

// should move to session service
export const isAuth = async () => {
	const session = await verifySession();

	if (!session.userId) {
		throw new UnauthorizedError("User is not authenticated");
	}
	return session;
};
