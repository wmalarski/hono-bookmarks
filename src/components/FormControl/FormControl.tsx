import type { FC, JSX } from "hono/jsx";
import {
	type FormControlVariants,
	formControlClass,
} from "./FormControl.styles";

type FormControlProps = JSX.IntrinsicElements["label"] & FormControlVariants;

export const FormControl: FC<FormControlProps> = ({
	class: className,
	...props
}) => {
	return <div {...props} class={formControlClass({ className })} />;
};
