import { ValidationParamsError } from "@/src/error";
import {
	TCreateNewUser,
	TUpdateUserRole,
	updateUserRoleSchema,
} from "@/src/zod-schema/user";

import { createNewUserSchema } from "@/src/zod-schema/user";

export const userValidationParams = {
	createNewLoginUser: (params: TCreateNewUser) => {
		const { error } = createNewUserSchema.safeParse(params);
		if (error) {
			throw new ValidationParamsError(error.message);
		}
		return params;
	},
	updateUserRole: (params: TUpdateUserRole) => {
		const { error } = updateUserRoleSchema.safeParse(params);
		if (error) {
			throw new ValidationParamsError(error.message);
		}
		return params;
	},
};
