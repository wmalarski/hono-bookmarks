import type { FC, JSX } from "hono/jsx";

export const PlusIcon: FC<JSX.IntrinsicElements["div"]> = (props) => {
	return (
		<svg
			fill="none"
			height="24"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			viewBox="0 0 24 24"
			width="24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			{...props}
		>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</svg>
	);
};
