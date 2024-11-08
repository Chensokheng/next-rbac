"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function loginWithOAuth(provider: "github") {
	const supabase = await createClient();

	const { data } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${process.env.APP_URL}/auth/callback`,
		},
	});

	if (data.url) {
		redirect(data.url);
	}
}
