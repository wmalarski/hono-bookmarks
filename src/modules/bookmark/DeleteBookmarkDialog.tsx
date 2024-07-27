import type { FC } from "hono/jsx";
import type { InferSelectModel } from "drizzle-orm";
import type { bookmarkTable } from "../../server/db/schema";
import {
	DialogActions,
	DialogClose,
	DialogContainer,
	DialogContent,
	DialogTrigger,
} from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";

type DeleteBookmarkDialogProps = {
	bookmark: InferSelectModel<typeof bookmarkTable>;
};

export const DeleteBookmarkDialog: FC<DeleteBookmarkDialogProps> = ({
	bookmark,
}) => {
	const dialogId = `dialog-delete-bookmark-${bookmark.id}`;
	const formId = `form-delete-bookmark-${bookmark.id}`;

	return (
		<>
			<DialogTrigger dialogId={dialogId} color="success" size="xs">
				Delete
			</DialogTrigger>
			<DialogContainer id={dialogId}>
				<DialogContent>
					<h3 class="font-bold text-lg">Delete Bookmark</h3>
					<form action="/" method="post" id={formId}>
						<input type="hidden" name="kind" value="delete-bookmark" />
						<input type="hidden" name="bookmarkId" value={bookmark.id} />
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
