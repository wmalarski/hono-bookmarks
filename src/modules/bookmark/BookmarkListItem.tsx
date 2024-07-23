import type { FC } from "hono/jsx";
import { Button } from "../../components/Button/Button";
import type { PreviewCard, Status } from "../../server/masto/types";
import type { MatchBookmarksResult } from "../../server/data/matchBookmarks";
import { BookmarkTag } from "./BookmarkTag";
import { BookmarkDoneCheckbox } from "./BookmarkDoneCheckbox";
import { BookmarkTagsForm } from "./BookmarkTagsForm";
import type { InferSelectModel } from "drizzle-orm";
import type { bookmarkTable, tagTable } from "../../server/db/schema";

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
	bookmark: InferSelectModel<typeof bookmarkTable>;
};

const RemoveBookmarkButton: FC<RemoveBookmarkButtonProps> = ({ bookmark }) => {
	return (
		<form action="/" method="post">
			<input type="hidden" name="kind" value="delete-bookmark" />
			<input type="hidden" name="bookmarkId" value={bookmark.id} />
			<Button type="submit">Remove</Button>
		</form>
	);
};

type BookmarkListItemProps = {
	item: MatchBookmarksResult;
	tags: InferSelectModel<typeof tagTable>[];
	tagsMap: Map<string, InferSelectModel<typeof tagTable>>;
};

export const BookmarkListItem: FC<BookmarkListItemProps> = ({
	item,
	tags,
	tagsMap,
}) => {
	const bookmark = item.bookmark;
	const mastoCard = item.mastoBookmark?.card;

	const title = bookmark?.title ?? mastoCard?.title ?? "";
	const text = bookmark?.content ?? mastoCard?.description ?? "";

	const assignedTags = item.bookmarkTags.flatMap((bookmarkTag) => {
		const tag = tagsMap.get(bookmarkTag.tagId);
		return tag ? [{ tag, bookmarkTag }] : [];
	});

	const onShareClick = () => {
		// const url = bookmark?.url ?? item.mastoBookmark?.uri ?? "";
		// window.navigator.share({ url, text, title });
	};

	return (
		<li class="flex flex-col gap-2 border-b-[1px] border-b-base-content p-4">
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
			<BookmarkTagsForm item={item} tags={tags} />
			{!item.mastoBookmark && item.bookmark && (
				<RemoveBookmarkButton bookmark={item.bookmark} />
			)}
			<Button type="button" onClick={onShareClick}>
				Share
			</Button>
			{item.mastoBookmark && (
				<MastoBookmarkItem mastoBookmark={item.mastoBookmark} />
			)}
		</li>
	);
};
