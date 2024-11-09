import React from "react";
import LogoutButton from "./_components/logoutButton";
import { getUser } from "@/src/services/users";
import ListUsers from "./_components/ListUsers";

export default async function page() {
	const getCachedUser = await getUser();
	const user = await getCachedUser();

	// if (user.role !== "admin") {
	// 	redirect("/");
	// }

	return (
		<div>
			<h1 className="text-2xl font-bold">My ID is {user.id}</h1>
			{user.role === "admin" && <ListUsers />}

			<LogoutButton />
		</div>
	);
}
