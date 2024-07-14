import { Hono } from "hono";
import { renderer } from "./renderer";
import { createAuthorizationUrl } from "./server/auth/session";
import { handleAuthCallback } from "./server/auth/callback";
import { authMiddleware } from "./server/auth/middleware";
import { Homepage } from "./modules/homepage/Homepage";
import { drizzleMiddleware } from "./server/db/middleware";
import { LoginPage } from "./modules/auth/LoginPage";
import { paths } from "./utils/paths";
import { AuthContext } from "./modules/auth/AuthContext";

const app = new Hono();

app.use(drizzleMiddleware);
app.use(authMiddleware);
app.use(renderer);

app.get("/", (context) => {
	const { user, session } = context.var;

	if (!user || !session) {
		return context.redirect(paths.login);
	}

	return context.render(
		<AuthContext.Provider value={{ session, user }}>
			<Homepage user={user} session={session} />
		</AuthContext.Provider>,
	);
});

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
