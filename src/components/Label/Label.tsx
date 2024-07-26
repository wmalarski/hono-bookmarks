import type { FC, JSX } from "hono/jsx";
import {
	labelClass,
	type LabelVariants,
	type LabelTextVariants,
	labelTextClass,
} from "./Label.styles";

type LabelProps = JSX.IntrinsicElements["div"] & LabelVariants;

export const Label: FC<LabelProps> = ({ class: className, ...props }) => {
	return <div {...props} class={labelClass({ className })} />;
};

type LabelTextProps = JSX.IntrinsicElements["span"] & LabelTextVariants;

export const LabelText: FC<LabelTextProps> = ({
	class: className,
	alt,
	...props
}) => {
	return <div {...props} class={labelTextClass({ alt, className })} />;
};
