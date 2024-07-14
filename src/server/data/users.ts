import { eq } from "drizzle-orm";
import { userTable } from "../db/schema";
import type { Context } from "hono";

export const getUserByMastoId = (context: Context, id: string) => {
	return context.var.db
		.select()
		.from(userTable)
		.where(eq(userTable.id, id))
		.get();
};

type AccountCredentials = {
	id: string;
	displayName: string;
};

export const insertUser = (
	context: Context,
	accountCredentials: AccountCredentials,
) => {
	const values = {
		id: accountCredentials.id,
		name: accountCredentials.displayName,
	};

	return context.var.db.insert(userTable).values(values).returning().get();
};
