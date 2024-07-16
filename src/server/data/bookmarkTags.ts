import { and, eq } from "drizzle-orm";
import type { Context } from "hono";
import { validateContextSession } from "../auth/middleware";
import { bookmarkTagTable } from "../db/schema";
import { HTTPException } from "hono/http-exception";

type CreateBookmarkTagsArgs = {
	tagIds: string[];
	bookmarkId: string;
};

export const createBookmarkTags = (
	context: Context,
	{ bookmarkId, tagIds }: CreateBookmarkTagsArgs,
) => {
	const session = validateContextSession(context);

	const result = context.var.db
		.insert(bookmarkTagTable)
		.values(
			tagIds.map((tagId) => ({
				bookmarkId,
				tagId,
				userId: session.userId,
				id: crypto.randomUUID(),
			})),
		)
		.returning()
		.all();

	if (result.length === 0) {
		throw new HTTPException(400);
	}

	return result;
};

type DeleteBookmarkTagArgs = {
	bookmarkTagId: string;
};

export const deleteBookmarkTag = (
	context: Context,
	{ bookmarkTagId }: DeleteBookmarkTagArgs,
) => {
	const session = validateContextSession(context);

	const result = context.var.db
		.delete(bookmarkTagTable)
		.where(
			and(
				eq(bookmarkTagTable.id, bookmarkTagId),
				eq(bookmarkTagTable.userId, session.userId),
			),
		)
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};
