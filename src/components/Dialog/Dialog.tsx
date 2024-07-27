import type { FC, JSX } from "hono/jsx";
import {
	dialogActionsClass,
	type DialogActionsVariants,
	dialogContainerClass,
	type DialogContainerVariants,
	dialogContentClass,
	type DialogContentVariants,
} from "./Dialog.styles";
import { buttonRecipe, type ButtonVariants } from "../Button/Button.styles";

export type DialogTriggerProps = JSX.IntrinsicElements["button"] &
	ButtonVariants & { dialogId: string };

export const DialogTrigger: FC<DialogTriggerProps> = ({
	color,
	isLoading,
	shape,
	size,
	variant,
	class: className,
	dialogId,
	...props
}) => {
	const onClick: DialogTriggerProps["onClick"] = () => {
		const elementId = `dialog#${dialogId}`;
		const element = document.querySelector<HTMLDialogElement>(elementId);
		element?.showModal();
	};

	return (
		<button
			type="button"
			{...props}
			onClick={onClick}
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

export type DialogCloseProps = JSX.IntrinsicElements["button"] & ButtonVariants;

export const DialogClose: FC<DialogCloseProps> = ({
	color,
	isLoading,
	shape,
	size,
	variant,
	class: className,
	...props
}) => {
	return (
		<form method="dialog">
			<button
				type="submit"
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
		</form>
	);
};

export type DialogContainerProps = JSX.IntrinsicElements["dialog"] &
	DialogContainerVariants & {
		id: string;
	};

export const DialogContainer: FC<DialogContainerProps> = ({
	class: className,
	...props
}) => {
	return <dialog {...props} class={dialogContainerClass({ className })} />;
};

export type DialogContentProps = JSX.IntrinsicElements["div"] &
	DialogContentVariants;

export const DialogContent: FC<DialogContentProps> = ({
	class: className,
	...props
}) => {
	return <div {...props} class={dialogContentClass({ className })} />;
};

export type DialogActionsProps = JSX.IntrinsicElements["div"] &
	DialogActionsVariants;

export const DialogActions: FC<DialogActionsProps> = ({
	class: className,
	...props
}) => {
	return <div {...props} class={dialogActionsClass({ className })} />;
};
