import type { Tokens } from "arctic";
import type { Context } from "hono";
import { createRestAPIClient } from "masto";
import { validateContextSession } from "../auth/middleware";
import { buildSearchParams } from "../../utils/searchParams";
import type { Status } from "./types";

export const verifyMastoCredentials = (context: Context, tokens: Tokens) => {
	const client = createRestAPIClient({
		url: context.env.MASTODON_URL,
		accessToken: tokens.accessToken,
	});

	return client.v1.accounts.verifyCredentials();
};

type ListMastoBookmarksArgs = {
	maxId: string | null;
};

export const listMastoBookmarks = async (
	context: Context,
	{ maxId }: ListMastoBookmarksArgs,
) => {
	const session = validateContextSession(context);

	const params = buildSearchParams({ max_id: maxId, limit: 10 });

	const response = await fetch(
		`${context.env.MASTODON_URL}/api/v1/bookmarks?${params}`,
		{ headers: { Authorization: `bearer ${session.accessToken}` } },
	);

	const mastoBookmarks = (await response.json()) as Status[];

	const link = response.headers.get("link");
	const minId = link?.match(/min_id=(\d+)>/)?.[1] || null;
	const newMaxId = link?.match(/max_id=(\d+)>/)?.[1] || null;

	const last = mastoBookmarks[mastoBookmarks.length - 1];
	const startDate = last ? new Date(last.created_at) : null;

	return { mastoBookmarks, minId, startDate, maxId: newMaxId };
};
