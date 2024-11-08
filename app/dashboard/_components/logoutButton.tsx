"use client";

import { logout } from "@/action/logout";
import React from "react";

export default function LogoutButton() {
	return (
		<div>
			<button onClick={async () => await logout()}>Logout</button>
		</div>
	);
}
