import { createRestAPIClient } from "masto";
import type { Tokens } from "arctic";

export const verifyMastoCredentials = (tokens: Tokens) => {
	const client = createRestAPIClient({
		url: import.meta.env.MASTODON_URL,
		accessToken: tokens.accessToken,
	});

	return client.v1.accounts.verifyCredentials();
};
