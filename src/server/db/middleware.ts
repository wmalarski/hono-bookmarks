import { createMiddleware } from "hono/factory";
import { initDbConnect } from "./init";

export const drizzleMiddleware = createMiddleware(async (context, next) => {
	const db = initDbConnect(context);

	context.set("db", db);

	await next();
});

declare module "hono" {
	interface ContextVariableMap {
		db: ReturnType<typeof initDbConnect>;
	}
}
