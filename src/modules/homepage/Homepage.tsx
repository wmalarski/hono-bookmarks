import type { FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { findTags } from "../../server/data/tags";
import { Navbar } from "./Navbar";
import { listMastoBookmarks } from "../../server/masto/helpers";
import {
	findBookmarks,
	findBookmarksByMastoIds,
} from "../../server/data/bookmarks";
import { matchBookmarks } from "../../server/data/matchBookmarks";
import { TagList } from "../tags/TagList";
import { BookmarkList } from "../bookmark/BookmarkList";
import { BookmarkFilters } from "../bookmark/BookmarkFilters";

type HomepageProps = {
	showDone: boolean;
};

export const Homepage: FC<HomepageProps> = async ({ showDone }) => {
	const context = useRequestContext();

	const { mastoBookmarks, minId, maxId } = await listMastoBookmarks(context, {
		maxId: null,
	});

	const tags = findTags(context);
	const tagsMap = new Map(tags.map((tag) => [tag.id, tag]));

	const bookmarksForMasto = findBookmarksByMastoIds(context, {
		mastoBookmarks,
	});

	const bookmarksResult = findBookmarks(context, {
		endDate: new Date(),
		startDate: null,
	});

	const matchedBookmarks = matchBookmarks({
		bookmarksForMasto,
		bookmarksResult,
		mastoBookmarks,
		showDone,
	});

	return (
		<main class="">
			<Navbar />
			<div class="mx-auto my-0 grid max-w-5xl grid-cols-[2fr_1fr]">
				<BookmarkList
					tags={tags}
					bookmarks={matchedBookmarks}
					tagsMap={tagsMap}
					maxId={maxId}
					minId={minId}
				/>
				<aside class="sticky top-0 block border-x-[1px] border-x-base-content">
					<BookmarkFilters showDone={showDone} />
					<TagList tags={tags} />
				</aside>
			</div>
		</main>
	);
};
