import type { FC } from "hono/jsx";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { Button } from "../../components/Button/Button";
import type { InferSelectModel } from "drizzle-orm";
import type { tagTable } from "../../server/db/schema";
import { BookmarkListItem } from "./BookmarkListItem";

type BookmarkListProps = {
	bookmarks: MatchBookmarksResult[];
	tags: InferSelectModel<typeof tagTable>[];
	tagsMap: Map<string, InferSelectModel<typeof tagTable>>;
	minId: string | null;
	maxId: string | null;
};

export const BookmarkList: FC<BookmarkListProps> = ({
	bookmarks,
	tags,
	tagsMap,
}) => {
	const onClick = () => {
		//
	};

	return (
		<div class="border-l-[1px] border-l-base-content">
			<ul class="flex flex-col">
				{bookmarks.map((item) => (
					<BookmarkListItem item={item} tags={tags} tagsMap={tagsMap} />
				))}
			</ul>
			<Button onClick={onClick}>Load more</Button>
		</div>
	);
};
