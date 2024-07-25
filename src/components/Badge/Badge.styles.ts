import type { VariantProps } from "class-variance-authority";
import { twCva } from "../utils/twCva";

export const badgeClass = twCva("badge", {
	defaultVariants: {
		color: null,
		size: null,
		variant: null,
	},
	variants: {
		color: {
			accent: "badge-accent",
			error: "badge-error",
			ghost: "badge-ghost",
			info: "badge-info",
			primary: "badge-primary",
			secondary: "badge-secondary",
			success: "badge-success",
			warning: "badge-warning",
		},
		size: {
			lg: "badge-lg",
			md: "badge-md",
			sm: "badge-sm",
			xs: "badge-xs",
		},
		variant: {
			outline: "badge-outline",
		},
	},
});

export type BadgeVariants = VariantProps<typeof badgeClass>;
