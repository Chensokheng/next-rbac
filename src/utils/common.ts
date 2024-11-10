import { UnauthorizedError } from "@/src/error/auth";
import { ForbiddenError } from "@/src/error/auth";
import { DatabaseError, InputValidationError } from "@/src/error/common";

const generateError = (message: string, code: number) => {
	return {
		error: {
			message,
			code,
		},
		data: null,
	};
};

export const handleError = (error: Error, message: string) => {
	if (error instanceof InputValidationError) {
		return generateError(error.message, 422);
	}
	if (error instanceof DatabaseError) {
		return generateError(error.message, 500);
	}
	if (error instanceof UnauthorizedError) {
		return generateError(error.message, 401);
	}
	if (error instanceof ForbiddenError) {
		return generateError(error.message, 403);
	}
	return generateError(message, 500);
};

export const generateResponse = (
	data: unknown,
	error?: {
		message: string;
		code: number;
	}
) => {
	return {
		data,
		error,
	};
};
