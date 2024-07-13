import { generateCodeVerifier, generateState, type Tokens } from "arctic";

import { client, lucia } from "./lucia";
import { verifyRequestOrigin } from "lucia";
import { createOAuthAPIClient } from "masto";
import { UNAUTHORIZED_ERROR } from "../errors";
import type { Context } from "hono";
import { setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";

const CODE_KEY = "code";
const CODE_VERIFIER_KEY = "code_verifier";
const STATE_KEY = "state";

const COOKIE_OPTIONS: CookieOptions = {
	httpOnly: true,
	maxAge: 60 * 10, // 10 min
	path: "/",
	secure: import.meta.env.PROD,
};

export const createAuthorizationUrl = async (
	context: Context,
): Promise<string> => {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();

	const url = await client.createAuthorizationURL({
		state,
		codeVerifier,
		scopes: ["read"],
	});

	setCookie(context, STATE_KEY, state, COOKIE_OPTIONS);
	setCookie(context, CODE_VERIFIER_KEY, codeVerifier, COOKIE_OPTIONS);

	return url.toString();
};

export const validateAuthorizationCode = async (
	context: Context,
): Promise<Tokens | null> => {
	const code = context.url.searchParams.get(CODE_KEY);
	const state = context.url.searchParams.get(STATE_KEY);

	const storedState = context.cookies.get(STATE_KEY)?.value;
	const storedCodeVerifier = context.cookies.get(CODE_VERIFIER_KEY)?.value;

	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		return Promise.resolve(null);
	}

	const client = createOAuthAPIClient({ url: import.meta.env.MASTODON_URL });

	return client.token.create({
		clientId: import.meta.env.MASTODON_CLIENT_ID,
		clientSecret: import.meta.env.MASTODON_CLIENT_SECRET,
		code,
		grantType: "authorization_code",
		redirectUri: import.meta.env.MASTODON_REDIRECT_URL,
	});
};

export const setSessionCookie = async (
	context: Context,
	userId: string,
	tokens: Tokens,
) => {
	const session = await lucia.createSession(userId, {
		accessToken: tokens.accessToken,
	});

	const sessionCookie = lucia.createSessionCookie(session.id);

	context.cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
};

export const setBlankSessionCookie = (context: Context) => {
	const sessionCookie = lucia.createBlankSessionCookie();

	context.cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
};

export const verifyRequest = (context: Context) => {
	const originHeader = context.request.headers.get("Origin");
	const hostHeader = context.request.headers.get("Host");

	return (
		originHeader &&
		hostHeader &&
		verifyRequestOrigin(originHeader, [hostHeader])
	);
};

export const authMiddleware = async (context: Context) => {
	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;

	if (!sessionId) {
		context.locals.user = null;
		context.locals.session = null;
		return;
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);

		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	}

	if (!session) {
		setBlankSessionCookie(context);
	}

	context.locals.session = session;
	context.locals.user = user;
};

export const validateContextSession = (context: Context) => {
	const session = context.locals.session;
	if (!session) {
		throw new ActionError(UNAUTHORIZED_ERROR);
	}
	return session;
};
