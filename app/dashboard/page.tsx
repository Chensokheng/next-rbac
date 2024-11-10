import React from "react";
import { redirect } from "next/navigation";
import { getUserQuery } from "@/src/query/users/getUser.query";

export default async function page() {
	const { data: user, error } = await getUserQuery();

	if (user?.role !== "admin") {
		redirect("/");
	}

	if (error?.code === 403 || error?.code === 401) {
		redirect("/");
	}


	return (
		<div>
			{user?.display_name} {JSON.stringify(user)}
		</div>
	);
}
