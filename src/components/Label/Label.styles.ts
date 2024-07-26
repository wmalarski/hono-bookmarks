import type { VariantProps } from "class-variance-authority";
import { twCva } from "../utils/twCva";

export const labelClass = twCva("label gap-2");

export type LabelVariants = VariantProps<typeof labelClass>;

export const labelTextClass = twCva("", {
	defaultVariants: {
		alt: false,
	},
	variants: {
		alt: {
			false: "label-text",
			true: "label-text-alt pt-2",
		},
	},
});

export type LabelTextVariants = VariantProps<typeof labelTextClass>;
