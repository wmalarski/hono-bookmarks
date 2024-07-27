import type { FC } from "hono/jsx";
import type { InferSelectModel } from "drizzle-orm";
import type { tagTable } from "../../server/db/schema";
import {
	DialogActions,
	DialogClose,
	DialogContainer,
	DialogContent,
	DialogTrigger,
} from "../../components/Dialog/Dialog";
import { Button } from "../../components/Button/Button";

type DeleteTagDialogProps = {
	tag: InferSelectModel<typeof tagTable>;
};

export const DeleteTagDialog: FC<DeleteTagDialogProps> = ({ tag }) => {
	const dialogId = `dialog-delete-tag-${tag.id}`;
	const formId = `form-delete-tag-${tag.id}`;

	return (
		<>
			<DialogTrigger dialogId={dialogId} color="success" size="xs">
				Delete
			</DialogTrigger>
			<DialogContainer id={dialogId}>
				<DialogContent>
					<h3 class="font-bold text-lg">Delete Tag</h3>
					<form action="/" method="post" id={formId}>
						<input type="hidden" name="kind" value="delete-tag" />
						<input type="hidden" name="tagId" value={tag.id} />
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
