import { and, eq, inArray, isNull, gte, lt } from "drizzle-orm";
import type { Status } from "../masto/types";
import type { Context } from "hono";
import { validateContextSession } from "../auth/middleware";
import { bookmarkTable, bookmarkTagTable } from "../db/schema";
import { HTTPException } from "hono/http-exception";

type FindMastoBookmarksArgs = {
	mastoBookmarks: Status[];
};

export const findBookmarksByMastoIds = (
	context: Context,
	{ mastoBookmarks }: FindMastoBookmarksArgs,
) => {
	const session = validateContextSession(context);

	if (mastoBookmarks.length === 0) {
		return [];
	}

	const mastoIds = mastoBookmarks.map((bookmark) => bookmark.id);

	return context.var.db
		.select()
		.from(bookmarkTable)
		.where(
			and(
				inArray(bookmarkTable.mastoBookmarkId, mastoIds),
				eq(bookmarkTable.userId, session.userId),
			),
		)
		.leftJoin(
			bookmarkTagTable,
			eq(bookmarkTable.id, bookmarkTagTable.bookmarkId),
		)
		.all();
};

export type FindBookmarksByMastoIdsResult = ReturnType<
	typeof findBookmarksByMastoIds
>;

type FindBookmarkArgs = {
	id: string;
};

export const findBookmark = (context: Context, { id }: FindBookmarkArgs) => {
	const session = validateContextSession(context);

	return context.var.db
		.select()
		.from(bookmarkTable)
		.where(
			and(eq(bookmarkTable.userId, session.userId), eq(bookmarkTable.id, id)),
		)
		.get();
};

export type FindBookmarkResult = ReturnType<typeof findBookmark>;

type FindBookmarksArgs = {
	startDate: Date | null;
	endDate: Date;
	done?: boolean;
};

export const findBookmarks = (
	context: Context,
	{ startDate, endDate, done }: FindBookmarksArgs,
) => {
	const session = validateContextSession(context);

	return context.var.db
		.select()
		.from(bookmarkTable)
		.where(
			and(
				isNull(bookmarkTable.mastoBookmarkId),
				eq(bookmarkTable.userId, session.userId),
				lt(bookmarkTable.createdAt, endDate),
				startDate ? gte(bookmarkTable.createdAt, startDate) : undefined,
				done !== undefined ? eq(bookmarkTable.done, done) : undefined,
			),
		)
		.leftJoin(
			bookmarkTagTable,
			eq(bookmarkTable.id, bookmarkTagTable.bookmarkId),
		)
		.all();
};

export type FindBookmarksResult = ReturnType<typeof findBookmarks>;

type CreateBookmarkArgs = {
	content: string | null;
	title: string | null;
	url: string | null;
	mastoBookmarkId: string | null;
	priority: number;
	done: boolean;
};

export const createBookmark = (
	context: Context,
	{ content, title, url, mastoBookmarkId, priority, done }: CreateBookmarkArgs,
) => {
	const session = validateContextSession(context);

	const bookmarkId = crypto.randomUUID();
	const result = context.var.db
		.insert(bookmarkTable)
		.values({
			content,
			userId: session.userId,
			createdAt: new Date(),
			title,
			url,
			done,
			id: bookmarkId,
			mastoBookmarkId,
			priority,
		})
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};

type FindOrCreateBookmarkArgs = CreateBookmarkArgs & {
	id?: string | undefined;
};

export const findOrCreateBookmark = (
	context: Context,
	{ id, ...createArgs }: FindOrCreateBookmarkArgs,
) => {
	return id
		? findBookmark(context, { id }) ?? createBookmark(context, createArgs)
		: createBookmark(context, createArgs);
};

export type FindOrCreateBookmarkResult = ReturnType<
	typeof findOrCreateBookmark
>;

type UpdateBookmarkArgs = {
	content: string | null;
	priority: number;
	done: boolean;
	bookmarkId: string;
};

export const updateBookmark = (
	context: Context,
	{ content, done, priority, bookmarkId }: UpdateBookmarkArgs,
) => {
	const session = validateContextSession(context);

	const result = context.var.db
		.update(bookmarkTable)
		.set({ content, done, priority })
		.where(
			and(
				eq(bookmarkTable.id, bookmarkId),
				eq(bookmarkTable.userId, session.userId),
			),
		)
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};

type DeleteBookmarkArgs = {
	bookmarkId: string;
};

export const deleteBookmark = (
	context: Context,
	{ bookmarkId }: DeleteBookmarkArgs,
) => {
	const session = validateContextSession(context);

	const result = context.var.db
		.delete(bookmarkTable)
		.where(
			and(
				eq(bookmarkTable.id, bookmarkId),
				eq(bookmarkTable.userId, session.userId),
			),
		)
		.returning()
		.get();

	if (!result) {
		throw new HTTPException(400);
	}

	return result;
};
