import type { FC, JSX } from "hono/jsx";
import { type CheckboxVariants, checkboxRecipe } from "./Checkbox.styles";

type CheckboxProps = JSX.IntrinsicElements["input"] & CheckboxVariants;

export const Checkbox: FC<CheckboxProps> = ({
	color,
	size,
	class: className,
	...props
}) => {
	return (
		<input
			type="checkbox"
			{...props}
			class={checkboxRecipe({
				className,
				color,
				size,
			})}
		/>
	);
};
