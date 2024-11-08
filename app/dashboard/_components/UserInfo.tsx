import React from "react";
import { getUser } from "@/src/services/users";

export default async function UserInfo() {
	const getCachedUser = await getUser();
	const user = await getCachedUser();
	return <div>{JSON.stringify(user)}</div>;
}
