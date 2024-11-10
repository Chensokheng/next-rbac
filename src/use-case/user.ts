import { userValidationParams } from "@/src/validation/user";
import { TCreateNewUser } from "@/src/zod-schema/user";
import { userDataAccess } from "@/src/data-access/user";
import { handleError } from "@/src/utils";

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
};
