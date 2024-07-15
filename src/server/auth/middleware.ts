import type { Context } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import type { Session, User } from "lucia";
import { getLucia } from "./lucia";
import { setBlankSessionCookie } from "./session";

export const authMiddleware = createMiddleware(async (context, next) => {
	const lucia = getLucia(context);
	context.set("lucia", lucia);

	const sessionId = getCookie(context, lucia.sessionCookieName);

	if (!sessionId) {
		context.set("user", null);
		context.set("session", null);
		return;
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);

		setCookie(
			context,
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		);
	}

	if (!session) {
		setBlankSessionCookie(context);
	}

	context.set("user", user);
	context.set("session", session);

	await next();
});

export const validateContextSession = (context: Context) => {
	const session = context.var.session;
	if (!session) {
		throw new HTTPException(401);
	}
	return session;
};

declare module "hono" {
	interface ContextVariableMap {
		session: Session | null;
		user: User | null;
		lucia: ReturnType<typeof getLucia>;
	}
}
