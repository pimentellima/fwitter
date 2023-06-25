import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";

const Post = ({ post }) => {
  const { data: session } = useSession();

  const {
    id: post_id,
    author,
    ingredients,
    createdAt,
    title,
    imageUrl,
    comments,
  } = post;

  const router = useRouter();

  const [likes, setLikes] = useState(post.likes);
  const [bookmarks, setBookmarks] = useState(post.bookmarks);
  const [shares, setShares] = useState(post.shares);
  const bookmarked = !!bookmarks.find((b) => b.author_id === session?.user.id);
  const liked = !!likes.find((b) => b.author_id === session?.user.id);
  const shared = !!shares.find((b) => b.author_id === session?.user.id);

  const mutation = useMutation(({ url, method }) => {
    if (method === "POST") return axios.post(url, { post_id });
    if (method === "DELETE")
      return axios.delete(url, {
        data: { post_id },
      });
  });

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "../api/bookmark",
      method: bookmarked ? "DELETE" : "POST",
    });
    const arr = bookmarked
      ? bookmarks.filter((i) => i.author_id !== session?.user?.id)
      : [...bookmarks, { author_id: session?.user?.id, post_id }];
    setBookmarks(arr);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "../api/share",
      method: shared ? "DELETE" : "POST",
    });
    const arr = shared
      ? shares.filter((i) => i.author_id !== session?.user?.id)
      : [...shares, { author_id: session?.user.id, post_id }];
    setShares(arr);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    mutation.mutate({
      url: "../api/like",
      method: liked ? "DELETE" : "POST",
    });
    const arr = liked
      ? likes.filter((i) => i.author_id !== session?.user.id)
      : [...likes, { author_id: session?.user.id, post_id }];
    setLikes(arr);
  };

  return (
    <div className="pb-1 pt-3 grid grid-cols-[80px,minmax(0px,1fr)]">
      <Image
        className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
        width={40}
        height={40}
        src={author.imageUrl || defaultUserImg}
        alt="profileImage"
      />
      <div className="flex flex-col pr-5">
        <div className="flex w-full justify-between">
          <div
            onClick={redirectToAuthor}
            className="flex w-full flex-col items-start hover:cursor-pointer sm:flex-row sm:items-center sm:gap-2"
          >
            <span
              className=" overflow-hidden text-ellipsis whitespace-nowrap
               font-bold hover:cursor-pointer hover:underline"
            >
              {author.name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-500">
              {`@${author.username} · ${moment(createdAt).fromNow(true)}`}
            </span>
          </div>
        </div>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-gray-800">
          {title}
        </span>
        {ingredients?.map((ingredient, index) => (
          <span
            key={index}
            className="inline  overflow-hidden text-ellipsis whitespace-nowrap text-sm"
          >
            {ingredient.qt + " " + ingredient.unity + " " + ingredient.name}
          </span>
        ))}
        {imageUrl && (
          <img
            className="mt-2 max-h-[500px] max-w-full rounded-2xl border border-slate-200"
            src={imageUrl}
            alt=""
          />
        )}
        <div className="mt-1 grid grid-cols-4 text-gray-600">
          <button className="group flex w-14 items-center gap-1 text-xs">
            <ChatBubbleOvalLeftIcon
              className={`h-9 w-9 rounded-full p-2
                    transition hover:bg-sky-200
                    group-hover:text-sky-500`}
            />
            <span
              className="text-xs transition
                  group-hover:text-blue-400"
            >
              {comments.length > 0 && comments.length}
            </span>
          </button>
          <button
            onClick={handleShare}
            className="group flex w-14 items-center gap-1 text-xs"
          >
            <ShareIcon
              height={35}
              width={35}
              className={`h-9 w-9 rounded-full p-2
                    transition hover:bg-green-100
                    group-hover:text-green-400 ${shared && "text-green-400"}`}
            />
            <span
              className={`text-xs ${
                shared && "text-green-400"
              } transition group-hover:text-green-400`}
            >
              {shares.length > 0 && shares.length}
            </span>
          </button>
          <button
            onClick={handleLike}
            className="group flex w-14 items-center gap-1 text-xs"
          >
            <HeartIcon
              className={`h-9 w-9 rounded-full p-2
             transition hover:bg-red-100
             group-hover:text-red-400 ${liked && "text-red-400"}`}
            />
            <span
              className={`${
                liked && "text-red-400"
              } transition ease-out group-hover:text-red-400`}
            >
              {likes.length > 0 && likes.length}
            </span>
          </button>
          <button
            onClick={handleBookmark}
            className="group flex w-14 items-center gap-1 text-xs"
          >
            <BookmarkIcon
              className={`h-9 w-9 
             rounded-full p-2 transition 
             hover:bg-orange-100
             hover:text-orange-400 ${bookmarked && "text-orange-400"}`}
            />
            <span
              className={`${
                bookmarked && "text-orange-400"
              } transition group-hover:text-orange-400`}
            >
              {bookmarks.length > 0 && bookmarks.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
