import type { InferSelectModel } from "drizzle-orm";
import { Button } from "../../components/Button/Button";
import type { tagTable } from "../../server/db/schema";

type TagsListItemProps = {
	tag: InferSelectModel<typeof tagTable>;
};

export const TagsListItem = ({ tag }: TagsListItemProps) => {
	return (
		<li>
			<span>{tag.name}</span>
			<form action="/" method="post">
				<input type="hidden" name="kind" value="delete-tag" />
				<Button type="submit">Delete</Button>
			</form>
		</li>
	);
};
