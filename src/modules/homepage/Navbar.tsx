import type { FC } from "hono/jsx";
import { Link } from "../../components/Link/Link";
import { paths } from "../../utils/paths";

export const Navbar: FC = () => {
	return (
		<nav class="navbar sticky top-0 z-10 gap-4 border-b-[1px] border-b-base-content bg-base-100">
			<div class="navbar-start">
				<Link variant="ghost" size="lg" href={paths.index}>
					Home
				</Link>
			</div>
			<div class="navbar-end">
				<Link variant="ghost" href={paths.loginMastodon}>
					Sign in with Mastodon
				</Link>
				<Link variant="ghost" href={paths.logout}>
					Sign out
				</Link>
			</div>
		</nav>
	);
};
