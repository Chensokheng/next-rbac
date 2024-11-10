import React, { Suspense } from "react";
import { userUseCase } from "@/src/use-case/user";
import { redirect } from "next/navigation";

import RscUserLists from "./_components/rsc-user-lists";

export const dynamic = "force-dynamic";

export default async function page() {
	const { data: user } = await userUseCase.getUserSession();

	if (user?.role !== "admin") {
		redirect("/dashboard");
	}

	return (
		<div>
			<h1 className="text-3xl font-bold">This page is only for admin</h1>
			<h1 className="text-2xl font-bold">User List</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<RscUserLists />
			</Suspense>
		</div>
	);
}
