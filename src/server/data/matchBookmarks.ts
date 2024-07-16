import type { bookmarkTable, bookmarkTagTable } from "../db/schema";
import type { Status } from "../masto/types";
import type {
	FindBookmarksByMastoIdsResult,
	FindBookmarksResult,
} from "./bookmarks";
import type { InferSelectModel } from "drizzle-orm";

type MatchBookmarksArgs = {
	mastoBookmarks: Status[];
	bookmarksForMasto: FindBookmarksByMastoIdsResult;
	bookmarksResult: FindBookmarksResult;
	showDone: boolean;
};

export type MatchBookmarksResult = {
	bookmark: InferSelectModel<typeof bookmarkTable> | null;
	mastoBookmark: Status | null;
	bookmarkTags: InferSelectModel<typeof bookmarkTagTable>[];
};

export const matchBookmarks = ({
	mastoBookmarks,
	bookmarksResult,
	bookmarksForMasto,
	showDone,
}: MatchBookmarksArgs): MatchBookmarksResult[] => {
	const bookmarks = new Map<string, InferSelectModel<typeof bookmarkTable>>();
	const bookmarkTags = new Map<
		string,
		InferSelectModel<typeof bookmarkTagTable>[]
	>();

	for (const entry of bookmarksForMasto) {
		const mastoBookmarkId = entry.bookmark.mastoBookmarkId;
		if (!mastoBookmarkId) {
			continue;
		}

		bookmarks.set(mastoBookmarkId, entry.bookmark);
	}

	for (const entry of [...bookmarksResult, ...bookmarksForMasto]) {
		if (!entry.bookmark_tag) {
			continue;
		}

		const bookmarkId = entry.bookmark.id;
		const tags = bookmarkTags.get(bookmarkId);

		if (tags) {
			tags.push(entry.bookmark_tag);
		} else {
			bookmarkTags.set(bookmarkId, [entry.bookmark_tag]);
		}
	}

	const fromMasto = mastoBookmarks.map((mastoBookmark) => {
		const bookmark = bookmarks.get(mastoBookmark.id);
		return {
			bookmark: bookmark ?? null,
			mastoBookmark,
			bookmarkTags: bookmark ? bookmarkTags.get(bookmark.id) ?? [] : [],
		};
	});

	const fromDb = bookmarksResult.map(({ bookmark }) => ({
		bookmark,
		mastoBookmark: null,
		bookmarkTags: bookmarkTags.get(bookmark.id) ?? [],
	}));

	const sorted = [...fromMasto, ...fromDb].toSorted(sortBookmarks);

	if (showDone) {
		return sorted;
	}

	return sorted.filter((entry) => !entry.bookmark?.done);
};

const getBookmarkDate = (match: MatchBookmarksResult) => {
	return (
		(match.mastoBookmark && Date.parse(match.mastoBookmark.created_at)) ??
		match.bookmark?.createdAt.getTime() ??
		0
	);
};

const sortBookmarks = (
	left: MatchBookmarksResult,
	right: MatchBookmarksResult,
) => {
	const leftDate = getBookmarkDate(left);
	const rightDate = getBookmarkDate(right);
	return rightDate - leftDate;
};
