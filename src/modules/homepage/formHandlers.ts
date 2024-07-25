import * as v from "valibot";
import type { Context } from "hono";
import { createTag, deleteTag } from "../../server/data/tags";
import {
	createBookmarkTags,
	deleteBookmarkTag,
} from "../../server/data/bookmarkTags";
import {
	deleteBookmark,
	findOrCreateBookmark,
	updateBookmark,
} from "../../server/data/bookmarks";

export const homepageSchema = v.union([
	v.object({
		kind: v.literal("create-tag"),
		name: v.pipe(v.string(), v.minLength(1)),
	}),
	v.object({
		kind: v.literal("delete-tag"),
		tagId: v.pipe(v.string(), v.minLength(1)),
	}),
	v.object({
		kind: v.literal("create-bookmark-tag"),
		bookmarkId: v.pipe(v.string(), v.minLength(1)),
		mastoBookmarkId: v.pipe(v.string(), v.minLength(1)),
		tagIds: v.array(v.string()),
	}),
	v.object({
		kind: v.literal("delete-bookmark-tag"),
		bookmarkTagId: v.pipe(v.string(), v.minLength(1)),
	}),
	v.object({
		kind: v.literal("delete-bookmark"),
		bookmarkId: v.pipe(v.string(), v.minLength(1)),
	}),
	v.object({
		kind: v.literal("done-change"),
		bookmarkId: v.optional(v.pipe(v.string(), v.minLength(1))),
		mastoBookmarkId: v.optional(v.pipe(v.string(), v.minLength(1))),
		done: v.boolean(),
	}),
]);

export const homepageHandler = (
	context: Context,
	data: v.InferInput<typeof homepageSchema>,
) => {
	switch (data.kind) {
		case "create-tag": {
			createTag(context, data);
			break;
		}
		case "delete-tag": {
			deleteTag(context, data);
			break;
		}
		case "delete-bookmark-tag": {
			deleteBookmarkTag(context, data);
			break;
		}
		case "create-bookmark-tag": {
			const bookmark = findOrCreateBookmark(context, {
				content: null,
				title: null,
				url: null,
				mastoBookmarkId: data.mastoBookmarkId ?? null,
				priority: 0,
				done: false,
				id: data.bookmarkId,
			});

			createBookmarkTags(context, {
				bookmarkId: data.bookmarkId ?? bookmark?.id,
				tagIds: data.tagIds,
			});
			break;
		}
		case "delete-bookmark": {
			deleteBookmark(context, data);
			break;
		}
		case "done-change": {
			const bookmark = findOrCreateBookmark(context, {
				mastoBookmarkId: data.mastoBookmarkId ?? null,
				content: null,
				title: null,
				url: null,
				done: data.done,
				priority: 0,
				id: data.bookmarkId,
			});

			updateBookmark(context, {
				bookmarkId: bookmark.id,
				content: bookmark.content,
				done: data.done,
				priority: bookmark.priority,
			});
			break;
		}
	}
};
