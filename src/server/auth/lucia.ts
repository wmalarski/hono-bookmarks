import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia } from "lucia";
import { OAuth2Client } from "oslo/oauth2";
import type { InferSelectModel } from "drizzle-orm";
import type { Tokens } from "arctic";
import { sessionTable, userTable } from "../db/schema";
import type { Context } from "hono";

export const getLucia = (context: Context) => {
	const adapter = new DrizzleSQLiteAdapter(
		context.var.db,
		sessionTable,
		userTable,
	);

	return new Lucia(adapter, {
		getUserAttributes: (attributes) => {
			return {
				name: attributes.name,
				id: attributes.id,
			};
		},
		getSessionAttributes: (attributes) => {
			return {
				accessToken: attributes.accessToken,
			};
		},
		sessionCookie: {
			attributes: {
				secure: context.env.PROD,
			},
		},
	});
};

export const getOAuth2Client = (context: Context) => {
	const TOKEN_ENDPOINT = `${context.env.MASTODON_URL}/oauth/token`;

	return new OAuth2Client(
		context.env.MASTODON_CLIENT_ID,
		`${context.env.MASTODON_URL}/oauth/authorize`,
		TOKEN_ENDPOINT,
		{ redirectURI: context.env.MASTODON_REDIRECT_URL },
	);
};

declare module "lucia" {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Register {
		Lucia: ReturnType<typeof getLucia>;
		DatabaseUserAttributes: InferSelectModel<typeof userTable>;
		DatabaseSessionAttributes: Pick<Tokens, "accessToken">;
	}
}
