import type { FC } from "hono/jsx";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { Button } from "../../components/Button/Button";

type BookmarkListProps = {
	bookmarks: MatchBookmarksResult[];
};

export const BookmarkList: FC<BookmarkListProps> = ({ bookmarks }) => {
	const onClick = () => {
		//
	};

	return (
		<div class="border-l-[1px] border-l-base-content">
			<ul class="flex flex-col">
				{bookmarks.map((item) => (
					<li>
						<bookmark-item item={item}></bookmark-item>
					</li>
				))}
			</ul>
			<Button onClick={onClick}>Load more</Button>
		</div>
	);
};
