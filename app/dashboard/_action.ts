"use server";

import { updateUserRole } from "@/src/services/users";
import { revalidateTag } from "next/cache";

export const revalidateUser = async (userId: string) => {
	revalidateTag(userId);
};

export const updateUserRoleAction = async (params: {
	updateUserId: string;
	roleName: string;
}) => {
	const res = await updateUserRole(params);

	if (!res.error) {
		revalidateUser(params.updateUserId);
	}

	return res;
};
