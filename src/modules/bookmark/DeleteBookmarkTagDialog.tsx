import type { FC } from "hono/jsx";
import type { InferSelectModel } from "drizzle-orm";
import type { bookmarkTagTable } from "../../server/db/schema";
import {
	DialogActions,
	DialogClose,
	DialogContainer,
	DialogContent,
	DialogTrigger,
} from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";
import { XIcon } from "../../components/Icons/XIcon";

type DeleteBookmarkTagDialogProps = {
	bookmarkTag: InferSelectModel<typeof bookmarkTagTable>;
};

export const DeleteBookmarkTagDialog: FC<DeleteBookmarkTagDialogProps> = ({
	bookmarkTag,
}) => {
	const dialogId = `dialog-delete-bookmark-tag-${bookmarkTag.id}`;
	const formId = `form-delete-bookmark-tag-${bookmarkTag.id}`;

	return (
		<>
			<DialogTrigger
				dialogId={dialogId}
				color="success"
				size="xs"
				aria-label="Delete bookmark tag"
			>
				<XIcon />
			</DialogTrigger>
			<DialogContainer id={dialogId}>
				<DialogContent>
					<h3 class="font-bold text-lg">Delete Bookmark Tag</h3>
					<form action="/" method="post" id={formId}>
						<input type="hidden" value="delete-bookmark-tag" name="kind" />
						<input type="hidden" value={bookmarkTag.id} name="bookmarkTagId" />
					</form>
					<DialogActions>
						<DialogClose>Close</DialogClose>
						<Button form={formId} type="submit">
							Submit
						</Button>
					</DialogActions>
				</DialogContent>
			</DialogContainer>
		</>
	);
};
