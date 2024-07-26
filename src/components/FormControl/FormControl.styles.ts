import type { VariantProps } from "class-variance-authority";
import { twCva } from "../utils/twCva";

export const formControlClass = twCva("form-control");

export type FormControlVariants = VariantProps<typeof formControlClass>;
