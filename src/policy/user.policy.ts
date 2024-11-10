import "server-only";

import { verifySession } from "@/src/auth/session";
import { ForbiddenError, UnauthorizedError } from "@/src/error";
import { commonPolicy } from "./common.policy";

export const userPolicy = {
	validateUpdateRole: async () => {
		const { isAuth, userId } = await verifySession();

		if (!isAuth || !userId) {
			throw new UnauthorizedError("User is not authenticated");
		}
		if (!(await commonPolicy.isAdmin(userId))) {
			throw new ForbiddenError("User is not authorized to update role");
		}
	},

	validateGetAllUser: async () => {
		const { isAuth, userId } = await verifySession();
		if (!isAuth || !userId) {
			throw new UnauthorizedError("User is not authenticated");
		}

		if (!(await commonPolicy.isAdmin(userId))) {
			throw new ForbiddenError("User is not authorized to get all user");
		}
	},
};
