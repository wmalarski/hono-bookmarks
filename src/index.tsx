import { Hono } from "hono";
import { renderer } from "./renderer";
import { createAuthorizationUrl } from "./server/auth/session";
import { handleAuthCallback } from "./server/auth/callback";
import { authMiddleware } from "./server/auth/middleware";
import { Homepage } from "./modules/homepage/Homepage";
import { drizzleMiddleware } from "./server/db/middleware";

const app = new Hono();

app.use(drizzleMiddleware);
app.use(authMiddleware);
app.use(renderer);

app.get("/", (context) => {
	return context.render(<Homepage />);
});

app.get("/login/mastodon", async (context) => {
	const url = await createAuthorizationUrl(context);
	return context.redirect(url);
});

app.get("/login/mastodon/callback", async (context) => {
	return handleAuthCallback(context);
});

export default app;
