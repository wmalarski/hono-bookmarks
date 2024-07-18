import type { FC } from "hono/jsx";
import { CreateTagForm } from "./CreateTagForm";
import type { InferSelectModel } from "drizzle-orm";
import type { tagTable } from "../../server/db/schema";
import { TagsListItem } from "./TagListItem";

type TagListProps = {
	tags: InferSelectModel<typeof tagTable>[];
};

export const TagList: FC<TagListProps> = ({ tags }) => {
	return (
		<div>
			<CreateTagForm />
			<ul>
				{tags.map((tag) => (
					<TagsListItem tag={tag} />
				))}
			</ul>
		</div>
	);
};
