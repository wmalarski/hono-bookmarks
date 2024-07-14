import sqlite from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import type { Context } from "hono";

export const initDbConnect = (context: Context) => {
	const sqliteDB = sqlite(context.env.DB_URL);
	return drizzle(sqliteDB);
};
