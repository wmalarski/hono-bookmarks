import type { FC } from "hono/jsx";
import { useRequestContext } from "hono/jsx-renderer";
import { findTags } from "../../server/data/tags";
import { useAuthContext } from "../auth/AuthContext";
import { Navbar } from "./Navbar";

type HomepageProps = {
	showDone: boolean;
};

export const Homepage: FC<HomepageProps> = async ({ showDone }) => {
	const { session, user } = useAuthContext();

	const context = useRequestContext();

	const { mastoBookmarks, minId, maxId } = await listMastoBookmarks(Astro, {
		maxId: null,
	});

	const tags = findTags(context);

	const bookmarksForMasto = findBookmarksByMastoIds(Astro, {
		mastoBookmarks,
	});

	const bookmarksResult = findBookmarks(Astro, {
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
			<pre>{JSON.stringify({ session, user, tags }, null, 2)}</pre>
		</main>
	);
};
