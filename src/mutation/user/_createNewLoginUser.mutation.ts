import "server-only";

import { User } from "@supabase/supabase-js";

import { validateCreateNewUserParams } from "@/src/validation/users";
import { dbCreateNewLoginUser } from "@/src/data-access/user";
import { generateResponse, handleError } from "@/src/utils/common";

/**
 * _createNewUserMutation is a private function that is used to create a new user and not exposed for user to call
 */

export const _createNewLoginUserMutation = async (user: User) => {
	try {
		/*
		 * TODO: console log user and extract value that needed it can different between google, github, and discord
		 * the example below is for github oauth
		 */
		const params = {
			id: user.id,
			email: user.email,
			picture: user.user_metadata.avatar_url,
			displayName: user.user_metadata.user_name,
		};

		const data = await validateCreateNewUserParams(params);
		const newUser = await dbCreateNewLoginUser(data);
		const response = generateResponse(newUser);
		return response as {
			data: typeof newUser;
			error: typeof response.error;
		};
	} catch (error) {
		return handleError(error as Error, "Failed to create new user");
	}
};
