import type { VariantProps } from "class-variance-authority";
import { twCva } from "../utils/twCva";

export const checkboxRecipe = twCva("checkbox", {
	defaultVariants: {
		color: null,
		size: null,
	},
	variants: {
		color: {
			accent: "checkbox-accent",
			error: "checkbox-error",
			info: "checkbox-info",
			primary: "checkbox-primary",
			secondary: "checkbox-secondary",
			success: "checkbox-success",
			warning: "checkbox-warning",
		},
		size: {
			lg: "checkbox-lg",
			md: "checkbox-md",
			sm: "checkbox-sm",
			xs: "checkbox-xs",
		},
	},
});

export type CheckboxVariants = VariantProps<typeof checkboxRecipe>;
