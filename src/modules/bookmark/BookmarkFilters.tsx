import type { FC } from "hono/jsx";
import { Button } from "../../components/Button/Button";

type BookmarkFiltersProps = {
	showDone: boolean;
};

export const BookmarkFilters: FC<BookmarkFiltersProps> = ({ showDone }) => {
	return (
		<form class="flex flex-col gap-4" method="get">
			<label>
				<input name="done" type="checkbox" checked={showDone} />
				Show Done
			</label>
			<Button type="submit">Filter</Button>
		</form>
	);
};
