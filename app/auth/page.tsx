"use client";

import React from "react";
import { loginWithOAuth } from "../../action/loginWithOAuth";

export default function page() {
	return (
		<div>
			<button onClick={async () => await loginWithOAuth("github")}>
				Login with Github
			</button>
		</div>
	);
}
