import { Button } from "../../components/Button/Button";
import { FormControl } from "../../components/FormControl/FormControl";
import { Label, LabelText } from "../../components/Label/Label";

export const CreateTagForm = () => {
	return (
		<form action="/" method="post">
			<input type="hidden" name="kind" value="create-tag" />
			<FormControl>
				<Label>
					<LabelText>New tag</LabelText>
				</Label>
				<input name="name" autofocus autocomplete="off" />
			</FormControl>
			<Button type="submit">Save</Button>
		</form>
	);
};
