import React from "react";
import UserLists from "./user-lists";
import { userUseCase } from "@/src/use-case/user";

export default async function RscUserLists() {
	const { data, error } = await userUseCase.getAllUser();

	if (error) {
		return <h1>{error.message}</h1>;
	}

	return <UserLists data={data} />;
}
