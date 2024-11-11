"use server";

import { db } from "@/src/drizzle";
import { animals, farm, food, roles, users } from "@/src/drizzle/schema";
import { eq } from "drizzle-orm";

export const insertTest3Drizzle = async () => {
	const start = new Date();

	await db.transaction(async (tx) => {
		const [res] = await tx
			.select({
				role: roles.role,
			})
			.from(users)
			.innerJoin(roles, eq(users.roleId, roles.id))
			.where(eq(users.id, "e5069381-fdc4-4529-a05b-761c59973089"));

		if (res.role !== "admin") {
			tx.rollback();
			return "Fail to insert you are not admin";
		}

		await tx.insert(food).values({ name: "Test food " + Math.random() });
		await tx.insert(farm).values({ name: "Test2 farm " + Math.random() });
		await tx
			.insert(animals)
			.values({ name: "Test3 animals " + Math.random() });
	});

	const end = new Date();
	const duration = end.getTime() - start.getTime();
	return `Duration of the transaction: ${duration} milliseconds`;
};
