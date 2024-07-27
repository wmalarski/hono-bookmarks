import type { InferSelectModel } from "drizzle-orm";
import type { bookmarkTagTable, tagTable } from "../../server/db/schema";
import type { FC } from "hono/jsx";
import { Badge } from "../../components/Badge/Badge";
import { DeleteBookmarkTagDialog } from "./DeleteBookmarkTagDialog";

type BookmarkTagProps = {
	bookmarkTag: InferSelectModel<typeof bookmarkTagTable>;
	tag: InferSelectModel<typeof tagTable>;
};

export const BookmarkTag: FC<BookmarkTagProps> = ({ bookmarkTag, tag }) => {
	return (
		<li>
			<Badge>
				{tag.name}
				<DeleteBookmarkTagDialog bookmarkTag={bookmarkTag} />
			</Badge>
		</li>
	);
};
