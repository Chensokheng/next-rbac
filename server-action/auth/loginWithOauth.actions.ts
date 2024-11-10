"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const loginWithOAuthAction = async (
	provider: "google" | "github" | "discord"
) => {
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
};
