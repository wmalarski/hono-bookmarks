import type { InferSelectModel } from "drizzle-orm";
import type { tagTable } from "../../server/db/schema";
import type { FC } from "hono/jsx";
import { DeleteTagDialog } from "./DeleteTagDialog";

type TagsListItemProps = {
	tag: InferSelectModel<typeof tagTable>;
};

export const TagsListItem: FC<TagsListItemProps> = ({ tag }) => {
	return (
		<li>
			<span>{tag.name}</span>
			<DeleteTagDialog tag={tag} />
		</li>
	);
};
