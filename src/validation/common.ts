import { z } from "zod";
import { InputValidationError } from "../error/common";

export const validateUUID = async (id: string) => {
	const schema = z.object({
		id: z.string().uuid(),
	});

	const { error, data } = schema.safeParse({ id });
	if (error) {
		throw new InputValidationError(error.message);
	}
	return data;
};
