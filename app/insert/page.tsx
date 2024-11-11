"use client";

import React, { useState } from "react";
import { insertTest3Drizzle } from "./_action";
import { createClient } from "@/utils/supabase/client";
import { insertTest3SupabaseFromAction } from "./_action/supabaseRpc";

export default function Page() {
	const [duration, setDuration] = useState<string | null>("");
	const [durationSupabase, setDurationSupabase] = useState<string | null>("");
	const [durationSupabaseAction, setDurationSupabaseAction] = useState<
		string | null
	>("");

	const handleTest3InsertDrizzle = async () => {
		const res = await insertTest3Drizzle();
		setDuration(res);
	};

	const handleTest3InsertSupabaseFromUI = async () => {
		const start = new Date();

		const supabase = createClient();
		const { data, error } = await supabase.rpc("insert_three_table");
		if (error) console.error(error);
		else console.log(data);

		const end = new Date();
		const duration = end.getTime() - start.getTime();
		setDurationSupabase(
			`Duration of the transaction: ${duration} milliseconds`
		);
	};

	const handleTest3InsertSupabaseFromAction = async () => {
		const res = await insertTest3SupabaseFromAction();
		setDurationSupabaseAction(res);
	};

	return (
		<div>
			<button onClick={handleTest3InsertDrizzle}>Insert Drizzle</button>
			<p>----------------------------------------------</p>
			<button onClick={handleTest3InsertSupabaseFromUI}>
				Insert Supabase RPC
			</button>
			<p>----------------------------------------------</p>

			<button onClick={handleTest3InsertSupabaseFromAction}>
				Insert Supabase RPC Action
			</button>
			<p>Drizzle: {duration}</p>
			<p>Supabase RPC call from UI: {durationSupabase}</p>
			<p>Supabase RPC call from Action: {durationSupabaseAction}</p>
		</div>
	);
}
