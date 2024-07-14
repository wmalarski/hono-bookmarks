import type { FC, JSX } from "hono/jsx";
import { buttonRecipe, type ButtonVariants } from "../Button/Button.styles";

type LinkProps = JSX.IntrinsicElements["a"] & ButtonVariants;

export const Link: FC<LinkProps> = ({
	color,
	isLoading,
	shape,
	size,
	variant = "link",
	class: className,
	...props
}) => {
	return (
		<a
			{...props}
			class={buttonRecipe({
				className,
				color,
				isLoading,
				shape,
				size,
				variant,
			})}
		/>
	);
};
