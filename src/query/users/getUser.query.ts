import "server-only";

import { dbGetUserById } from "@/src/data-access/user";
import { isAuth } from "@/src/policy/common";
import { generateResponse, handleError } from "@/src/utils/common";

export const getUserQuery = async () => {
	try {
		const session = await isAuth();

		const user = await dbGetUserById(session.userId);
		const response = generateResponse(user);

		return response as {
			data: typeof user;
			error: typeof response.error;
		};
	} catch (error) {
		return handleError(error as Error, "Failed to get user");
	}
};
