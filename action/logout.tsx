"use server";

import { deleteSession } from "@/src/services/session";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function logout() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	await deleteSession();
	redirect("/auth");
}
