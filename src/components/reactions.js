import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import "moment/locale/pt-br";
import { useState } from "react";
import { usePostMutation } from "../server/api/post/post-mutations";
import { useUser } from "@clerk/nextjs";

const Reactions = ({ post }) => {
  const { user: userLoggedIn } = useUser();

  const { id: post_id, likes, bookmarks, shares } = post;

  const [reactions, setReactions] = useState({
    liked: !!likes.find((like) => like.author_id === userLoggedIn?.id),
    numLikes: likes.length,
    bookmarked: !!bookmarks.find(
      (bookmarks) => bookmarks.author_id === userLoggedIn?.id
    ),
    numBookmarks: bookmarks.length,
    shared: !!shares.find((share) => share.author_id === userLoggedIn?.id),
    numShares: shares.length,
  });

  const mutation = usePostMutation();

  const handleBookmark = (e) => {
    e.stopPropagation();
    reactions.bookmarked
      ? mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/bookmark",
            method: "DELETE",
          },
        })
      : mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/bookmark",
            method: "POST",
          },
        });
    setReactions((reactions) => ({
      ...reactions,
      bookmarked: !reactions.bookmarked,
      numBookmarks: reactions.bookmarked
        ? reactions.numBookmarks - 1
        : reactions.numBookmarks + 1,
    }));
  };

  const handleShare = (e) => {
    e.stopPropagation();
    reactions.shared
      ? mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/share",
            method: "DELETE",
          },
        })
      : mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/share",
            method: "POST",
          },
        });
    setReactions((reactions) => ({
      ...reactions,
      shared: !reactions.shared,
      numShares: reactions.shared
        ? reactions.numShares - 1
        : reactions.numShares + 1,
    }));
  };

  const handleLike = (e) => {
    e.stopPropagation();
    reactions.liked
      ? mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/like",
            method: "DELETE",
          },
        })
      : mutation.mutate({
          options: {
            body: {
              post_id,
              author_id: userLoggedIn.id,
            },
            url: "api/like",
            method: "POST",
          },
        });
    setReactions((reactions) => ({
      ...reactions,
      liked: !reactions.liked,
      numLikes: reactions.liked
        ? reactions.numLikes - 1
        : reactions.numLikes + 1,
    }));
  };

  return (
    <div
      className="flex flex-row 
                        items-center justify-between pt-4"
    >
      <button>
        <ChatBubbleOvalLeftIcon
          className={`h-10 w-10 rounded-full p-2 transition
            ease-out
            text-stone-400
            hover:bg-stone-700
            hover:text-blue-400`}
        />
      </button>
      <button
        onClick={handleShare}
        className="group flex h-12 w-12 items-center text-xs text-stone-400"
      >
        <ShareIcon
          className={`h-10 w-10 rounded-full p-2 transition
          ease-out
          hover:bg-stone-700
          hover:text-green-400
          group-hover:text-green-400 ${reactions.shared && "text-green-400"}`}
        />
        <p
          className={`${
            reactions.shared && "text-green-400"
          } transition ease-out group-hover:text-green-400`}
        >
          {reactions.numShares > 0 && reactions.numShares}
        </p>
      </button>
      <button
        onClick={handleLike}
        className="group flex h-12 w-12 items-center text-sm text-stone-400"
      >
        <HandThumbUpIcon
          className={`h-10 w-10 rounded-full p-2 transition
           ease-out
           hover:bg-stone-700
           hover:text-red-400 ${reactions.liked && "text-red-400"}`}
        />
        <p
          className={`${
            reactions.liked && "text-red-400"
          } transition ease-out group-hover:text-red-400`}
        >
          {reactions.numLikes > 0 && reactions.numLikes}
        </p>
      </button>
      <button
        onClick={handleBookmark}
        className="group flex h-12 w-12 items-center text-sm text-stone-400"
      >
        <BookmarkIcon
          className={`h-10 w-10 rounded-full p-2 transition
           ease-out
           hover:bg-stone-700
           hover:text-orange-400 ${reactions.bookmarked && "text-orange-400"}`}
        />
        <p
          className={`${
            reactions.bookmarked && "text-orange-400"
          } transition ease-out group-hover:text-orange-400`}
        >
          {reactions.numBookmarks > 0 && reactions.numBookmarks}
        </p>
      </button>
    </div>
  );
};

export default Reactions;
