"use server";

import { createClient } from "@/utils/supabase/server";

export const insertTest3SupabaseFromAction = async () => {
	const start = new Date();
	const supabase = await createClient();
	await supabase.rpc("insert_three_table");
	const end = new Date();
	const duration = end.getTime() - start.getTime();
	return `Duration of the transaction: ${duration} milliseconds`;
};
