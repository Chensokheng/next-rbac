import {
	UnauthorizedError,
	ForbiddenError,
	ValidationParamsError,
} from "@/src/error";

const generateError = (message: string, code: number) => {
	return {
		data: null,
		error: {
			message,
			code,
		},
	};
};

export const handleError = (error: Error, message: string) => {
	if (error instanceof ValidationParamsError) {
		return generateError(error.message, 422);
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
