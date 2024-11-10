"use server";

import { userUseCase } from "@/src/use-case/user";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateUserRoleAction = async (params: { id: string; role: "admin" | "user" | "guest" }) => {
	const { id, role } = params;
	const result = await userUseCase.updateUserRole({ id, role });
	revalidatePath("/admin");
	revalidateTag(id);
	return result;
};
