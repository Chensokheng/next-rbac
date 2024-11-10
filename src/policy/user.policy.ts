import { verifySession } from "@/src/auth/session";
import { db } from "@/src/drizzle";
import { roles, users } from "@/src/drizzle/schema";
import { ForbiddenError, UnauthorizedError } from "@/src/error";
import { eq } from "drizzle-orm";

export const userPolicy = {
	validateUpdateRole: async () => {
		const { isAuth, userId } = await verifySession();

		if (!isAuth || !userId) {
			throw new UnauthorizedError("User is not authenticated");
		}

		const [user] = await db
			.select({
				role: roles.role,
			})
			.from(users)
			.innerJoin(roles, eq(users.roleId, roles.id))
			.where(eq(users.id, userId));

		if (user.role !== "admin") {
			throw new ForbiddenError("User is not authorized to update role");
		}
	},
};
