"use client";

import React from "react";
import { loginWithOAuth } from "./_action/login-with-oauth";

export default function page() {
	const handleLoginWithOAuth = async (provider: "google" | "github") => {
		const response = await loginWithOAuth(provider);
		if (response?.error) {
			alert(response.error.message);
		}
		if (response?.data.url) {
			window.location.href = response.data.url;
		}
	};

	return (
		<div>
			<button onClick={() => handleLoginWithOAuth("github")}>
				Login with Github
			</button>
		</div>
	);
}
