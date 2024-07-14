import type { FC } from "hono/jsx";
import { Navbar } from "./Navbar";

export const Homepage: FC = () => {
	return (
		<main class="relative">
			<Navbar />
		</main>
	);
};
