import { isAdmin, isAuth } from "./common";
import { ForbiddenError } from "@/src/error/auth";

export const isAllowUpdateUserRolePolicy = async () => {
	const session = await isAuth();
	if (!(await isAdmin(session.userId))) {
		throw new ForbiddenError("You are not allowed to update user role");
	}
};
