import type { FC } from "hono/jsx";
import { Link } from "../../components/Link/Link";
import { paths } from "../../utils/paths";

export const LoginPage: FC = () => {
	return (
		<main>
			<h2>Login</h2>
			<div>
				<Link color="primary" size="lg" href={paths.loginMastodon}>
					Sign In using Mastodon!
				</Link>
			</div>
		</main>
	);
};
