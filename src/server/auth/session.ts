import { generateCodeVerifier, generateState, type Tokens } from "arctic";
import { verifyRequestOrigin } from "lucia";
import { createOAuthAPIClient } from "masto";
import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import type { CookieOptions } from "hono/utils/cookie";
import { getOAuth2Client } from "./lucia";

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

	const client = getOAuth2Client(context);

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
	const code = context.req.query(CODE_KEY);
	const state = context.req.query(STATE_KEY);

	const storedState = getCookie(context, STATE_KEY);
	const storedCodeVerifier = getCookie(context, CODE_VERIFIER_KEY);

	if (!code || !storedState || !storedCodeVerifier || state !== storedState) {
		return Promise.resolve(null);
	}

	const client = createOAuthAPIClient({ url: context.env.MASTODON_URL });

	return client.token.create({
		clientId: context.env.MASTODON_CLIENT_ID,
		clientSecret: context.env.MASTODON_CLIENT_SECRET,
		code,
		grantType: "authorization_code",
		redirectUri: context.env.MASTODON_REDIRECT_URL,
	});
};

export const setSessionCookie = async (
	context: Context,
	userId: string,
	tokens: Tokens,
) => {
	const session = await context.var.lucia.createSession(userId, {
		accessToken: tokens.accessToken,
	});

	const sessionCookie = context.var.lucia.createSessionCookie(session.id);

	setCookie(
		context,
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
};

export const setBlankSessionCookie = (context: Context) => {
	const sessionCookie = context.var.lucia.createBlankSessionCookie();

	setCookie(
		context,
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes,
	);
};

export const verifyRequest = (context: Context) => {
	const originHeader = context.req.header("Origin");
	const hostHeader = context.req.header("Host");

	return (
		originHeader &&
		hostHeader &&
		verifyRequestOrigin(originHeader, [hostHeader])
	);
};
