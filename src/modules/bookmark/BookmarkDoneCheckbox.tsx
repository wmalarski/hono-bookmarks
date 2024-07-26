import type { FC } from "hono/jsx";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { FormControl } from "../../components/FormControl/FormControl";
import { Label, LabelText } from "../../components/Label/Label";

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
			<FormControl>
				<Checkbox name="done" checked={item.bookmark?.done} />
				<Label>
					<LabelText>Done</LabelText>
				</Label>
			</FormControl>
		</form>
	);
};
