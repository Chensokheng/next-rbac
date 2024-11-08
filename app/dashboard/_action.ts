"use server";

import { revalidateTag } from "next/cache";

export const revalidateUser = async (userId: string) => {
	revalidateTag(userId);
};
