import { vValidator } from "@hono/valibot-validator";
import { Hono } from "hono";
import * as v from "valibot";
import { AuthContext } from "./modules/auth/AuthContext";
import { LoginPage } from "./modules/auth/LoginPage";
import { Homepage } from "./modules/homepage/Homepage";
import { renderer } from "./renderer";
import { handleAuthCallback } from "./server/auth/callback";
import { authMiddleware } from "./server/auth/middleware";
import { createAuthorizationUrl } from "./server/auth/session";
import { drizzleMiddleware } from "./server/db/middleware";
import { paths } from "./utils/paths";

const app = new Hono();

app.use(drizzleMiddleware);
app.use(authMiddleware);
app.use(renderer);

app.get(
	"/",
	vValidator(
		"query",
		v.object({
			showDone: v.pipe(
				v.optional(v.string()),
				v.transform((value) => value?.toLowerCase() === String(true)),
			),
		}),
	),
	(context) => {
		const { user, session } = context.var;

		if (!user || !session) {
			return context.redirect(paths.login);
		}

		const { showDone } = context.req.valid("query");

		return context.render(
			<AuthContext.Provider value={{ session, user }}>
				<Homepage showDone={showDone} />
			</AuthContext.Provider>,
		);
	},
);

app.get("/login", async (context) => {
	return context.render(<LoginPage />);
});

app.get("/login/mastodon", async (context) => {
	const url = await createAuthorizationUrl(context);
	return context.redirect(url);
});

app.get("/login/mastodon/callback", async (context) => {
	return handleAuthCallback(context);
});

export default app;
