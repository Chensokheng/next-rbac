import "server-only";
import { userValidationParams } from "@/src/validation/user";
import { TCreateNewUser, TUpdateUserRole } from "@/src/zod-schema/user";
import { userDataAccess } from "@/src/data-access/user";
import { handleError } from "@/src/utils";
import { verifySession } from "../auth/session";
import { UnauthorizedError } from "../error";
import { userPolicy } from "../policy/user.policy";

export const userUseCase = {
	createNewLoginUser: async (params: TCreateNewUser) => {
		try {
			userValidationParams.createNewLoginUser(params);
			const user = await userDataAccess.createNewLoginUser(params);
			return {
				data: user,
				error: null,
			};
		} catch (error) {
			return handleError(
				error as Error,
				"Failed to create new login user"
			);
		}
	},

	getUserSession: async () => {
		try {
			const session = await verifySession();
			if (!session || !session.userId) {
				throw new UnauthorizedError("User not found");
			}
			const user = await userDataAccess.getCacheUser(session.userId);
			return {
				data: {
					...user.users,
					role: user.roles.role,
				},
				error: null,
			};
		} catch (error) {
			return handleError(error as Error, "Failed to get user session");
		}
	},

	getAllUser: async () => {
		try {	
			await userPolicy.validateGetAllUser();
			const result = await userDataAccess.getAllUser();
			return {
				data: result.map((user) => ({
					...user.users,
					role: user.roles.role,
				})),
				error: null,
			};
		} catch (error) {
			return handleError(error as Error, "Failed to get all users");
		}
	},

	updateUserRole: async (params: TUpdateUserRole) => {
		try {
			userValidationParams.updateUserRole(params);
			await userPolicy.validateUpdateRole();
			await userDataAccess.updateUserRole(params);
			return {
				data: null,
				error: null,
			};
		} catch (error) {
			return handleError(error as Error, "Failed to update user role");
		}
	},
};
