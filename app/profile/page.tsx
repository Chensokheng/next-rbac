import React from "react";
import { getUserQuery } from "@/src/query/users/getUser.query";

export default async function page() {
	const { data: user, error } = await getUserQuery();

	return (
		<div>
			{user?.display_name} {JSON.stringify(user)} {JSON.stringify(error)}
		</div>
	);
}
