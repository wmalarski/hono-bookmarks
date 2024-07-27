import type { VariantProps } from "class-variance-authority";
import { twCva } from "../utils/twCva";

export const dialogContainerClass = twCva("modal");

export type DialogContainerVariants = VariantProps<typeof dialogContainerClass>;

export const dialogContentClass = twCva("modal-box");

export type DialogContentVariants = VariantProps<typeof dialogContentClass>;

export const dialogActionsClass = twCva("modal-action");

export type DialogActionsVariants = VariantProps<typeof dialogActionsClass>;
