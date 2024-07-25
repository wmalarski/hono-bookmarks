import type { FC } from "hono/jsx";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { Checkbox } from "../../components/Checkbox/Checkbox";

type BookmarkDoneCheckboxProps = {
	item: MatchBookmarksResult;
};

export const BookmarkDoneCheckbox: FC<BookmarkDoneCheckboxProps> = ({
	item,
}) => {
	return (
		<form action="/" method="post">
			<input type="hidden" name="kind" value="done-change" />
			<input type="hidden" name="bookmarkId" value={item.bookmark?.id} />
			<input
				type="hidden"
				name="mastoBookmarkId"
				value={item.mastoBookmark?.id}
			/>
			<label>
				<Checkbox name="done" checked={item.bookmark?.done} />
				Done
			</label>
		</form>
	);
};
