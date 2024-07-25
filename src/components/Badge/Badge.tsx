import type { FC, JSX } from "hono/jsx";
import { badgeClass, type BadgeVariants } from "./Badge.styles";

type BadgeProps = JSX.IntrinsicElements["div"] & BadgeVariants;

export const Badge: FC<BadgeProps> = ({
	class: className,
	color,
	size,
	variant,
	...props
}) => {
	return (
		<div
			{...props}
			class={badgeClass({
				className,
				color,
				size,
				variant,
			})}
		/>
	);
};
