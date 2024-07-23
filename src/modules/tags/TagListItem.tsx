import type { InferSelectModel } from "drizzle-orm";
import { Button } from "../../components/Button/Button";
import type { tagTable } from "../../server/db/schema";
import type { FC } from "hono/jsx";

type TagsListItemProps = {
	tag: InferSelectModel<typeof tagTable>;
};

export const TagsListItem: FC<TagsListItemProps> = ({ tag }) => {
	return (
		<li>
			<span>{tag.name}</span>
			<form action="/" method="post">
				<input type="hidden" name="kind" value="delete-tag" />
				<input type="hidden" name="tagId" value={tag.id} />
				<Button type="submit">Delete</Button>
			</form>
		</li>
	);
};
