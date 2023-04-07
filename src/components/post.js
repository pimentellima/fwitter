import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
import { usePostMutation } from "../server/api/post/post-mutations";

const Post = ({ post, userLoggedIn }) => {

  const {
    id: post_id,
    author,
    createdAt,
    title,
    ingredients,
    likes,
    bookmarks,
    shares,
  } = post;

  const [reactions, setReactions] = useState({
    liked: !!likes.find((like) => like.author_id === userLoggedIn.id),
    bookmarked: !!bookmarks.find((bookmarks) => bookmarks.author_id === userLoggedIn.id),
    shared: !!shares.find((share) => share.author_id === userLoggedIn.id),
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
          url: 'api/bookmark',
          method: 'DELETE'
        }
      })
      : mutation.mutate({
        options: {
          body: {
            post_id,
            author_id: userLoggedIn.id,
          },
          url: 'api/bookmark',
          method: 'POST'
        }
      })
    setReactions((reactions) => ({
      ...reactions,
      bookmarked: !reactions.bookmarked,
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
          url: 'api/share',
          method: 'DELETE'
        }
      })
      : mutation.mutate({
        options: {
          body: {
            post_id,
            author_id: userLoggedIn.id,
          },
          url: 'api/share',
          method: 'POST'
        }
      })
    setReactions((reactions) => ({
      ...reactions,
      shared: !reactions.shared,
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
          url: 'api/like',
          method: 'DELETE'
        }
      })
      : mutation.mutate({
        options: {
          body: {
            post_id,
            author_id: userLoggedIn.id,
          },
          url: 'api/like',
          method: 'POST'
        }
      })
    setReactions((reactions) => ({
      ...reactions,
      liked: !reactions.liked,
    }));
  };

  return (
    <div className="flex flex-row py-3">
      <img
        className="user-img hover:cursor-pointer"
        src={author?.profileImageUrl}
        alt="profileImage"
      />
      <div className="mr-6 flex w-full flex-col">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p
              className="font-bold 
                            hover:cursor-pointer hover:underline"
            >
              {author?.firstName}
            </p>
            <div
              className="flex flex-row gap-1 
                                  text-sm text-stone-400 hover:cursor-pointer"
            >
              <p>{"@" + author?.username}</p>
              <p>
                {" "}
                {". " + moment(createdAt, "YYYY-MM-DD HH:mm:ss").fromNow(true)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-1 text-xl">{title}</p>
          <p className="mt-1 font-medium">{"Ingredientes: "}</p>
          {ingredients?.map((ingredient, index) => (
            <p key={index} className="inline">
              {" "}
              {ingredient.qt + " " + ingredient.unity + " " + ingredient.name}
            </p>
          ))}
          <div
            className="flex flex-row 
                        items-center justify-between pt-4"
          >
            <ChatBubbleOvalLeftIcon className={`post-icon`} />
            <ShareIcon
              onClick={handleShare}
              className={`post-icon 
                                ${reactions.shared && "text-green-400"}`}
            />
            <HandThumbUpIcon
              onClick={handleLike}
              className={`post-icon 
                                ${reactions.liked && "text-red-400"}`}
            />
            <BookmarkIcon
              onClick={handleBookmark}
              className={`post-icon 
                                ${reactions.bookmarked && "text-orange-400"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
