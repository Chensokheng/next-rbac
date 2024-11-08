import React from "react";
import LogoutButton from "./_components/logoutButton";
import UserInfo from "./_components/UserInfo";
import { getUser } from "@/src/services/users";

export default async function page() {
	const getCachedUser = await getUser();
	const user = await getCachedUser();

	return (
		<div>
			{JSON.stringify(user)}
			<UserInfo />
			<LogoutButton />
			{/* {user?.id && <RevalidateButton userId={user.id} />} */}
		</div>
	);
}
