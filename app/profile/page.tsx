import React from "react";
import { getUser } from "@/src/services/users";

export default async function page() {
	const user = await getUser();

	return <div>{JSON.stringify(user)}</div>;
}
