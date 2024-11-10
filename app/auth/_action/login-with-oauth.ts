"use server";

import { createClient } from "@/utils/supabase/server";

export const loginWithOAuth = async (provider: "google" | "github") => {
	const supabase = await createClient();
	return await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `${process.env.APP_URL}/auth/callback`,
		},
	});
};
