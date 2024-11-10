import { z } from "zod";
import { InputValidationError } from "../error/common";

export const validateUpdateUserRoleParams = async (params: {
	userId: string;
	roleName: string;
}) => {
	const validateSchema = z.object({
		userId: z.string(),
		roleName: z.string(),
	});

	const { error, data } = validateSchema.safeParse(params);
	if (error) {
		throw new InputValidationError(error.message);
	}
	return data;
};

export const validateCreateNewUserParams = async (params: {
	id: string;
	email?: string;
	picture?: string;
	displayName?: string;
}) => {
	const schema = z.object({
		id: z.string().uuid(),
		email: z.string().email(),
		picture: z.string().optional(),
		displayName: z.string().optional(),
	});

	const { error, data } = schema.safeParse(params);

	if (error) {
		throw new InputValidationError(error.message);
	}
	return data;
};
