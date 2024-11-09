import React from "react";
import { getAllUsers } from "@/src/services/users";
import SwitchRole from "./SwitchRole";

export default async function ListUsers() {
	const { data: users, error } = await getAllUsers();

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			{users?.map((user) => (
				<div key={user.id}>
					{user.email}
					<SwitchRole
						defaultValue={user.role}
						updateUserId={user.id}
					/>
				</div>
			))}
		</div>
	);
}
