import type { Tokens } from "arctic";
import type { Context } from "hono";
import { createRestAPIClient } from "masto";

export const verifyMastoCredentials = (context: Context, tokens: Tokens) => {
	const client = createRestAPIClient({
		url: context.env.MASTODON_URL,
		accessToken: tokens.accessToken,
	});

	return client.v1.accounts.verifyCredentials();
};
