import { Button } from "../../components/Button/Button";

export const CreateTagForm = () => {
	return (
		<form action="/" method="post">
			<input type="hidden" name="kind" value="create-tag" />
			<label>
				<span>New tag</span>
				<input name="name" autofocus autocomplete="off" />
			</label>
			<Button type="submit">Save</Button>
		</form>
	);
};
