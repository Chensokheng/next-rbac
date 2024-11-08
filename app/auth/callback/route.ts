import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { createSession } from "@/src/services/session";
import { createNewUser } from "@/src/services/users";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createClient();
		const { error, data } = await supabase.auth.exchangeCodeForSession(
			code
		);

		if (!error) {
			try {
				let expiresAt: Date | undefined;
				if (data?.session?.expires_at) {
					expiresAt = new Date(data.session.expires_at * 1000);
				}
				if (data.user) {
					const { id: userId } = await createNewUser({
						id: data.user?.id,
						email: data.user?.email ?? "",
					});
					await createSession(userId, expiresAt);
				}
				return NextResponse.redirect(`${origin}${next}`);
			} catch {
				await supabase.auth.signOut();
				return NextResponse.redirect(`${origin}/auth/auth-code-error`);
			}
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
