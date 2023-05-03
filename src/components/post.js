import moment from "moment";
import "moment/locale/pt-br";
import { useState } from "react";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { useMutation } from "react-query";
import axios from "axios";
import defaultPicUrl from "../utils/defaultPicUrl";
import { useRouter } from "next/router";

const Post = ({ post }) => {
  const { id: post_id, author, ingredients, createdAt, title, imageUrl } = post;
  const session = useSession();
  const loggedUser = session?.data?.user;
  const router = useRouter();

  const [likes, setLikes] = useState(post.likes);
  const [bookmarks, setBookmarks] = useState(post.bookmarks);
  const [shares, setShares] = useState(post.shares);
  const bookmarked = !!bookmarks.find((b) => b.author_id === loggedUser?.id);
  const liked = !!likes.find((b) => b.author_id === loggedUser?.id);
  const shared = !!shares.find((b) => b.author_id === loggedUser?.id);

  const mutation = useMutation(({ url, method }) => {
    if (method === "POST")
      return axios.post(url, { post_id, author_id: loggedUser.id });
    if (method === "DELETE")
      return axios.delete(url, {
        data: { post_id, author_id: loggedUser.id },
      });
  });

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
  };



  const handleBookmark = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "api/bookmark",
      method: bookmarked ? "DELETE" : "POST",
    });
    const arr = bookmarked
      ? shares.filter((i) => i.author_id !== loggedUser.id)
      : [...shares, { author_id: loggedUser.id, post_id }];
    setBookmarks(arr);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "api/share",
      method: shared ? "DELETE" : "POST",
    });
    const arr = shared
      ? shares.filter((i) => i.author_id !== loggedUser.id)
      : [...shares, { author_id: loggedUser.id, post_id }];
    setShares(arr);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "api/like",
      method: liked ? "DELETE" : "POST",
    });
    const arr = liked
      ? likes.filter((i) => i.author_id !== loggedUser.id)
      : [...likes, { author_id: loggedUser.id, post_id }];
    setLikes(arr);
  };

  return (
    <div className="flex flex-row py-3">
      <img
        className="mx-4 h-12 w-12 rounded-full hover:cursor-pointer"
        onClick={redirectToAuthor}
        src={author.imageUrl ? author.imageUrl : defaultPicUrl}
        alt="profileImage"
      />
      <div className="mr-6 flex w-full flex-col">
        <div className="flex justify-between">
          <div
            onClick={redirectToAuthor}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <p
              className="font-bold 
                            hover:cursor-pointer hover:underline"
            >
              {author.name}
            </p>
            <div
              className="flex flex-row gap-1 
                                  text-sm text-stone-400 hover:cursor-pointer"
            >
              <p>{"@" + author.username}</p>
              <p>
                {" "}
                {" · " + moment(createdAt).fromNow(true)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="my-1 text-xl">{title}</p>
          {ingredients?.map((ingredient, index) => (
            <p key={index} className="inline">
              {" "}
              {ingredient.qt + " " + ingredient.unity + " " + ingredient.name}
            </p>
          ))}
          {imageUrl && (
            <img className="mt-4 rounded-md" src={imageUrl} alt="" />
          )}
          <div
            className="flex flex-row 
                        items-center justify-between pt-4"
          >
            <button>
              <ChatBubbleOvalLeftIcon
                className={`h-10 w-10 rounded-full p-2 text-stone-400
            transition
            ease-out
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
          group-hover:text-green-400 ${shared && "text-green-400"}`}
              />
              <p
                className={`text-xs ${
                  shared && "text-green-400"
                } transition ease-out group-hover:text-green-400`}
              >
                {shares.length > 0 && shares.length}
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
           hover:text-red-400 ${liked && "text-red-400"}`}
              />
              <p
                className={`${
                  liked && "text-red-400"
                } transition ease-out group-hover:text-red-400`}
              >
                {likes.length > 0 && likes.length}
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
           hover:text-orange-400 ${bookmarked && "text-orange-400"}`}
              />
              <p
                className={`${
                  bookmarked && "text-orange-400"
                } transition ease-out group-hover:text-orange-400`}
              >
                {bookmarks.length > 0 && bookmarks.length}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
