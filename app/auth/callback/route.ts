import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

import { createSession } from "@/src/services/session";
import { _createNewLoginUserMutation } from "@/src/mutation/user/_createNewLoginUser.mutation";

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
			if (data.user) {
				let expiresAt: Date | undefined;
				if (data?.session?.expires_at) {
					expiresAt = new Date(data.session.expires_at * 1000);
				}
				const { data: createdUser, error: createUserError } =
					await _createNewLoginUserMutation(data.user);

				if (createUserError) {
					await supabase.auth.signOut();
					return NextResponse.redirect(
						`${origin}/auth/auth-code-error`
					);
				}

				if (createdUser?.id) {
					await createSession(createdUser.id, expiresAt);
				}
			}
			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
