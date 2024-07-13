import { db, userTable } from "../db";
import { eq } from "drizzle-orm";

export const getUserByMastoId = (id: string) => {
	return db.select().from(userTable).where(eq(userTable.id, id)).get();
};

type AccountCredentials = {
	id: string;
	displayName: string;
};

export const insertUser = (accountCredentials: AccountCredentials) => {
	const values = {
		id: accountCredentials.id,
		name: accountCredentials.displayName,
	};

	return db.insert(userTable).values(values).returning().get();
};
