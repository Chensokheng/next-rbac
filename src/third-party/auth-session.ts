import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET;
const key = new TextEncoder().encode(secretKey);

type SessionPayload = {
	userId: string;
	expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1hr")
		.sign(key);
}

export async function decrypt(session: string | undefined = "") {
	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch {
		return null;
	}
}

export async function createSession(userId: string, expiresAt?: Date) {
	expiresAt = expiresAt || new Date(Date.now() + 60 * 60 * 1000);
	const session = await encrypt({ userId, expiresAt });

	const cookiesStore = await cookies();

	cookiesStore.set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
}

export async function verifySession() {
	const cookieSt = (await cookies()).get("session")?.value;
	const session = await decrypt(cookieSt);

	if (!session) {
		return { isAuth: false, userId: null };
	}

	return { isAuth: true, userId: session.userId as string };
}

// export async function updateSession() {
// 	const session = cookies().get("session")?.value;
// 	const payload = await decrypt(session);

// 	if (!session || !payload) {
// 		return null;
// 	}

// 	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
// 	cookies().set("session", session, {
// 		httpOnly: true,
// 		secure: true,
// 		expires: expires,
// 		sameSite: "lax",
// 		path: "/",
// 	});
// }

export async function deleteSession() {
	const cookiesStore = await cookies();
	cookiesStore.delete("session");
}
