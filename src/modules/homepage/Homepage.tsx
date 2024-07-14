import type { FC } from "hono/jsx";
import { Navbar } from "./Navbar";
import { useAuthContext } from "../auth/AuthContext";

export const Homepage: FC = () => {
	const { session, user } = useAuthContext();

	return (
		<main class="relative">
			<Navbar />
			<pre>{JSON.stringify({ session, user }, null, 2)}</pre>
		</main>
	);
};
