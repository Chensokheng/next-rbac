"use client";

import React, { useTransition } from "react";
import { updateUserRoleAction } from "../_action";
import { useRouter } from "next/navigation";

export default function SwitchRole({
	defaultValue,
	updateUserId,
}: {
	defaultValue: string;
	updateUserId: string;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		startTransition(async () => {
			const res = await updateUserRoleAction({
				updateUserId,
				roleName: e.target.value,
			});
			if (res.error?.code === 403) {
				router.refresh();
			}

			if (res.error) {
				alert(res.error.message);
			}
		});
	};

	return (
		<div>
			<select
				defaultValue={defaultValue}
				onChange={handleChange}
				disabled={isPending}
			>
				<option value="admin">Admin</option>
				<option value="member">Member</option>
			</select>
		</div>
	);
}
