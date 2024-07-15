import { eq } from "drizzle-orm";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { validateContextSession } from "../auth/middleware";
import { tagTable } from "../db/schema";

const TAG_LIMIT = 100;

export const findTags = (context: Context) => {
	validateContextSession(context);

	return context.var.db.select().from(tagTable).limit(TAG_LIMIT).all();
};

type CreateTagArgs = {
	name: string;
};

export const createTag = (context: Context, { name }: CreateTagArgs) => {
	validateContextSession(context);

	const result = context.var.db
		.insert(tagTable)
		.values({ name, id: crypto.randomUUID() })
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};

type DeleteTagArgs = {
	tagId: string;
};

export const deleteTag = (context: Context, { tagId }: DeleteTagArgs) => {
	validateContextSession(context);

	const result = context.var.db
		.delete(tagTable)
		.where(eq(tagTable.id, tagId))
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};
