import type { FC } from "hono/jsx";
import { Button } from "../../components/Button/Button";
import type { PreviewCard, Status } from "../../server/masto/types";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { BookmarkTag } from "./BookmarkTag";

type MastoBookmarkCardProps = {
	card: PreviewCard;
};

const MastoBookmarkCard: FC<MastoBookmarkCardProps> = ({ card }) => {
	if (!card.image) {
		return <></>;
	}

	return (
		<a href={card.url}>
			<img class="card" src={card.image} alt={card.title} />
		</a>
	);
};

type MastoBookmarkItemProps = {
	mastoBookmark: Status;
};

const MastoBookmarkItem: FC<MastoBookmarkItemProps> = ({ mastoBookmark }) => {
	return (
		<div class="flex flex-col gap-2">
			<span>{mastoBookmark.created_at}</span>
			<span>{mastoBookmark.uri}</span>
			<div>
				<span>{mastoBookmark.account.display_name}</span>
				<img
					alt="Avatar"
					class="avatar h-8 w-8"
					src={mastoBookmark.account.avatar_static}
				/>
			</div>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: mastoBookmark.content }} />
			{mastoBookmark.card?.image && (
				<MastoBookmarkCard card={mastoBookmark.card} />
			)}
		</div>
	);
};

type RemoveBookmarkButtonProps = {
	item: MatchBookmarksResult;
};

const RemoveBookmarkButton: FC<RemoveBookmarkButtonProps> = () => {
	return (
		<form action="/" method="post">
			<input type="hidden" name="kind" value="remove-bookmark" />
			<Button type="submit">Remove</Button>
		</form>
	);
};

type BookmarkListItemProps = {
	item: MatchBookmarksResult;
};

export const BookmarkListItem: FC<BookmarkListItemProps> = ({ item }) => {
	const bookmark = item.bookmark;
	const mastoCard = item.mastoBookmark?.card;

	const title = bookmark?.title ?? mastoCard?.title ?? "";
	const text = bookmark?.content ?? mastoCard?.description ?? "";
	const url = bookmark?.url ?? item.mastoBookmark?.uri ?? "";

	const assignedTags = item.bookmarkTags.flatMap((bookmarkTag) => {
		const tag = tagsContext.tagsMap.get(bookmarkTag.tagId);
		return tag ? [{ tag, bookmarkTag }] : [];
	});

	const onShareClick = () => {
		//
	};

	return (
		<div class="flex flex-col gap-2 border-b-[1px] border-b-base-content p-4">
			<strong>{title}</strong>
			<span>{text}</span>
			{assignedTags && assignedTags.length > 0 ? (
				<ul>
					{assignedTags.map(({ tag, bookmarkTag }) => (
						<BookmarkTag tag={tag} bookmarkTag={bookmarkTag} />
					))}
				</ul>
			) : null}
			<BookmarkDoneCheckbox item={item} />
			<BookmarkTagsForm item={item} />
			{!item.mastoBookmark && item.bookmark && (
				<RemoveBookmarkButton item={item} />
			)}
			<Button type="button" onClick={onShareClick}>
				Share
			</Button>
			{item.mastoBookmark && (
				<MastoBookmarkItem mastoBookmark={item.mastoBookmark} />
			)}
		</div>
	);
};
