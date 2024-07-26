import type { FC } from "hono/jsx";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import type { InferSelectModel } from "drizzle-orm";
import type { tagTable } from "../../server/db/schema";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";

type BookmarkTagsFormProps = {
	item: MatchBookmarksResult;
	tags: InferSelectModel<typeof tagTable>[];
};

export const BookmarkTagsForm: FC<BookmarkTagsFormProps> = ({ item, tags }) => {
	const tagsIds = new Set(
		item.bookmarkTags.map((bookmarkTag) => bookmarkTag.tagId),
	);

	const unassignedTags = tags.filter((tag) => !tagsIds.has(tag.id));

	return (
		<form action="/">
			<input type="hidden" name="kind" value="create-bookmark-tag" />
			<input type="hidden" name="bookmarkId" value={item.bookmark?.id} />
			<input
				type="hidden"
				name="mastoBookmarkId"
				value={item.mastoBookmark?.id}
			/>
			<label>
				Tags
				<Select name="tag">
					<option value="" selected>
						Please choose
					</option>
					{unassignedTags.map((tag) => (
						<option value={tag.id}>{tag.name}</option>
					))}
				</Select>
			</label>
			<Button type="submit">Save</Button>
		</form>
	);
};
