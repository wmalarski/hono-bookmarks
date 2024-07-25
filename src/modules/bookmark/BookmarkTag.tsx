import type { InferSelectModel } from "drizzle-orm";
import type { bookmarkTagTable, tagTable } from "../../server/db/schema";
import type { FC } from "hono/jsx";
import { Button } from "../../components/Button/Button";
import { Badge } from "../../components/Badge/Badge";

type BookmarkTagProps = {
	bookmarkTag: InferSelectModel<typeof bookmarkTagTable>;
	tag: InferSelectModel<typeof tagTable>;
};

export const BookmarkTag: FC<BookmarkTagProps> = ({ bookmarkTag, tag }) => {
	return (
		<li>
			<Badge>
				{tag.name}
				<form action="/" method="post">
					<input type="hidden" value="delete-bookmark-tag" name="kind" />
					<input type="hidden" value={bookmarkTag.id} name="bookmarkTagId" />
					<Button type="submit" aria-label="Remove">
						<span aria-hidden="true">x</span>
					</Button>
				</form>
			</Badge>
		</li>
	);
};
