import { isAllowUpdateUserRolePolicy } from "@/src/policy/user";
import { validateUpdateUserRoleParams } from "@/src/validation/users";

export const updateUserRoleMutation = async (params: {
	userId: string;
	roleName: string;
}) => {
	await validateUpdateUserRoleParams(params);
	await isAllowUpdateUserRolePolicy();
};
