import type { FC, JSX } from "hono/jsx";
import { type SelectVariants, selectRecipe } from "./Select.styles";

type SelectProps = JSX.IntrinsicElements["select"] & SelectVariants;

export const Select: FC<SelectProps> = ({
	color,
	size,
	variant,
	class: className,
	...props
}) => {
	return (
		<select
			{...props}
			class={selectRecipe({
				className,
				color,
				size,
				variant,
			})}
		/>
	);
};
