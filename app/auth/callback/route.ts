import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { userUseCase } from "@/src/use-case/user";
import { createSession } from "@/src/auth/session";
import { revalidateTag } from "next/cache";

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	// if "next" is in param, use it as the redirect URL
	const next = searchParams.get("next") ?? "/";

	if (code) {
		const supabase = await createClient();
		const {
			error,
			data: { user },
		} = await supabase.auth.exchangeCodeForSession(code);
		

		if (!error && user) {
			const response = await userUseCase.createNewLoginUser({
				id: user?.id ?? "",
				email: user?.email ?? "",

				// update base on your repsonse oauth user this exampe is github
				displayName: user?.user_metadata?.user_name ?? "",
				picture: user?.user_metadata?.avatar_url ?? "",
			});

			if (response?.error) {
				await supabase.auth.signOut();
				return NextResponse.redirect(
					`${origin}/auth/auth-code-error?message=${response.error.message}`
				);
			}

			await createSession(response.data.id);
			revalidateTag(response.data.id);

			return NextResponse.redirect(`${origin}${next}`);
		}
	}

	// return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
