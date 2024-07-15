import type { FC } from "hono/jsx";
import { Navbar } from "./Navbar";
import { useAuthContext } from "../auth/AuthContext";

type HomepageProps = {
	showDone: boolean;
};

export const Homepage: FC<HomepageProps> = () => {
	const { session, user } = useAuthContext();

	return (
		<main class="relative">
			<Navbar />
			<pre>{JSON.stringify({ session, user }, null, 2)}</pre>
		</main>
	);
};
