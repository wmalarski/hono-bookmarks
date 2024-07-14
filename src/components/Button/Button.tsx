import type { FC, JSX } from "hono/jsx";
import { buttonRecipe, type ButtonVariants } from "./Button.styles";

type ButtonProps = JSX.IntrinsicElements["button"] & ButtonVariants;

export const Button: FC<ButtonProps> = ({
	color,
	isLoading,
	shape,
	size,
	variant,
	class: className,
	...props
}) => {
	return (
		<button
			type="button"
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
