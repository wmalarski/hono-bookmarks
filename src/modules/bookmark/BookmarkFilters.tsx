import type { FC } from "hono/jsx";
import { Button } from "../../components/Button/Button";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { FormControl } from "../../components/FormControl/FormControl";
import { Label, LabelText } from "../../components/Label/Label";

type BookmarkFiltersProps = {
	showDone: boolean;
};

export const BookmarkFilters: FC<BookmarkFiltersProps> = ({ showDone }) => {
	return (
		<form class="flex flex-col gap-4" method="get">
			<FormControl>
				<Checkbox name="done" checked={showDone} />
				<Label>
					<LabelText> Show Done</LabelText>
				</Label>
			</FormControl>
			<Button type="submit">Filter</Button>
		</form>
	);
};
