import React, { Suspense } from "react";
import Profile from "./profile";
import Link from "next/link";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center p-4">
			<h1>Next RBAC</h1>
			<Link href="/admin">Only Admin</Link>
			<Link href="/dashboard">Dashboard</Link>

			<Suspense fallback={<div>Loading...</div>}>
				<Profile />
			</Suspense>
		</div>
	);
}
