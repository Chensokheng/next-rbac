"use client";

import React, { useTransition } from "react";
import { updateUserRoleAction } from "../_action/updateUserRole.action";

export default function UserLists({
	data,
}: {
	data: {
		role: "user" | "admin" | "guest";
		id: string;
		createdAt: string;
		displayName: string | null;
		email: string;
		picture: string | null;
		roleId: string;
	}[];
}) {
	const [isPending, startTransition] = useTransition();

	const handleUpdateRole = async (
		id: string,
		role: "admin" | "user" | "guest"
	) => {
		startTransition(async () => {
			const { error } = await updateUserRoleAction({ id, role });
			if (error) {
				alert(error.message);
			}
			alert("Success");
		});
	};

	return (
		<div>
			{data.map((user) => {
				return (
					<div key={user.id} className="flex items-center divide-x-2">
						<h1>{user.email.split("@")[0]}</h1>

						<select
							defaultValue={user.role}
							onChange={(e) => {
								handleUpdateRole(
									user.id,
									e.target.value as "admin" | "user" | "guest"
								);
							}}
							disabled={isPending}
						>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
					</div>
				);
			})}
		</div>
	);
}
