import { Hono } from "hono";
import { renderer } from "./renderer";
import { createAuthorizationUrl } from "./server/auth/session";
import { handleAuthCallback } from "./server/auth/callback";
import { authMiddleware } from "./server/auth/middleware";

const app = new Hono();

app.use(authMiddleware);
app.use(renderer);

app.get("/", (context) => {
	return context.render(<h1>Hello!</h1>);
});

app.get("/login/mastodon", async (context) => {
	const url = await createAuthorizationUrl(context);
	return context.redirect(url);
});

app.get("/login/mastodon/callback", async (context) => {
	return handleAuthCallback(context);
});

export default app;
