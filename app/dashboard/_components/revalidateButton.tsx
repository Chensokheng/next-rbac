"use client";

import React from "react";
import { revalidateUser } from "../_action";

export default function RevalidateButton({ userId }: { userId: string }) {
	return <button onClick={async() => await revalidateUser("53b58e3e-b37a-456b-a2d1-fffd832bf139")}>revalidate</button>;
}
