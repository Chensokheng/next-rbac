import { db } from "@/src/drizzle";
import { roles } from "@/src/drizzle/schema";
import React from "react";

export default async function page() {
	console.log("start", new Date().toISOString());

	const result = await db.transaction(async (tx) => {
		await tx.query.users.findMany();
		return await tx.query.roles.findMany();
	});
	console.log("end", new Date().toISOString());

	return <div>{JSON.stringify(result)}</div>;
}
