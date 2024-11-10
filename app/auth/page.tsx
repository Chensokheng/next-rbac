"use client";

import React from "react";

import { loginWithOAuthAction } from "@/server-action/auth/loginWithOauth.actions";

export default function page() {
	return (
		<div>
			<button onClick={async () => await loginWithOAuthAction("github")}>
				Login with Github
			</button>
		</div>
	);
}
