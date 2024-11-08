import "server-only";

import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifySession } from "./session";
import { cache } from "react";
import { unstable_cache } from "next/cache";

export const createNewUser = async (params: {
	id: string;
	email: string;
	createdAt?: string;
	displayName?: string;
	picture?: string;
}) => {
	return await db.transaction(async (tx) => {
		const [user] = await tx
			.select()
			.from(users)
			.where(eq(users.id, params.id));

		if (user) {
			return { id: user.id };
		}
		const [newUser] = await tx
			.insert(users)
			.values(params)
			.returning({ id: users.id });

		return newUser;
	});
};

export const getUser = cache(async () => {
	const user = await verifySession();
	return unstable_cache(
		async () => {
			return await db.query.users.findFirst({
				where: eq(users.id, user.userId),
			});
		},
		[user.userId],
		{
			tags: [user.userId],
			revalidate: 60,
		}
	);
});
