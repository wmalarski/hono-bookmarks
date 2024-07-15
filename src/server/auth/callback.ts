import { OAuth2RequestError } from "arctic";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { getUserByMastoId, insertUser } from "../data/users";
import { verifyMastoCredentials } from "../masto/helpers";
import { setSessionCookie, validateAuthorizationCode } from "./session";

export const handleAuthCallback = async (context: Context) => {
	try {
		const tokens = await validateAuthorizationCode(context);

		if (!tokens) {
			throw new HTTPException(400);
		}

		const mastoUser = await verifyMastoCredentials(context, tokens);

		const existingUser = getUserByMastoId(context, mastoUser.id);

		if (existingUser) {
			await setSessionCookie(context, existingUser.id, tokens);

			return context.redirect("/");
		}

		const newUser = insertUser(context, mastoUser);

		await setSessionCookie(context, newUser.id, tokens);

		return context.redirect("/");
	} catch (error) {
		if (error instanceof OAuth2RequestError) {
			throw new HTTPException(400);
		}

		throw new HTTPException(500);
	}
};
