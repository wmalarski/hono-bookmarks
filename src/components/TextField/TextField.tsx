import type { VariantProps } from "class-variance-authority";
import type { FC, JSX } from "hono/jsx";
import { textFieldClass } from "./TextField.styles";

export type TextFieldProps = JSX.IntrinsicElements["input"] &
	VariantProps<typeof textFieldClass>;

export const TextField: FC<TextFieldProps> = ({
	color,
	size,
	variant,
	class: className,
	...props
}) => {
	return (
		<input
			type="text"
			{...props}
			class={textFieldClass({
				class: className,
				color,
				size,
				variant,
			})}
		/>
	);
};
