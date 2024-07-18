import type { FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { findTags } from "../../server/data/tags";
import { useAuthContext } from "../auth/AuthContext";
import { Navbar } from "./Navbar";
import { listMastoBookmarks } from "../../server/masto/helpers";
import {
	findBookmarks,
	findBookmarksByMastoIds,
} from "../../server/data/bookmarks";
import { matchBookmarks } from "../../server/data/matchBookmarks";
import { TagList } from "../tags/TagList";

type HomepageProps = {
	showDone: boolean;
};

export const Homepage: FC<HomepageProps> = async ({ showDone }) => {
	const { session, user } = useAuthContext();

	const context = useRequestContext();

	const { mastoBookmarks, minId, maxId } = await listMastoBookmarks(context, {
		maxId: null,
	});

	const tags = findTags(context);

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
		<main class="relative">
			<Navbar />
			<div>
				<pre>
					{JSON.stringify(
						{ session, user, tags, minId, maxId, matchedBookmarks },
						null,
						2,
					)}
				</pre>
				<TagList tags={tags} />
			</div>
		</main>
	);
};
