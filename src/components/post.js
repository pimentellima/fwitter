import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import { useSession } from "next-auth/react";
import Image from "next/image";

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
    <div className="mb-1 mt-3 grid grid-cols-[80px,minmax(0px,1fr)]">
      <Image
        className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
        width={40}
        height={40}
        src={author.imageUrl || defaultUserImg}
        alt="profileImage"
      />
      <div className="flex flex-col">
        <div className="flex w-full justify-between">
          <div
            onClick={redirectToAuthor}
            className="flex w-full items-center gap-2 hover:cursor-pointer"
          >
            <span
              className=" overflow-hidden text-ellipsis whitespace-nowrap
               font-bold hover:cursor-pointer hover:underline"
            >
              {author.name}
            </span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-stone-400">
              {`@${author.username} · ${moment(createdAt).fromNow(true)}`}
            </span>
          </div>
        </div>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
          {title}
        </span>
        {ingredients?.map((ingredient, index) => (
          <span
            key={index}
            className="inline  overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {ingredient.qt + " " + ingredient.unity + " " + ingredient.name}
          </span>
        ))}
        {imageUrl && (
          <img
            className="max-h-96 max-w-[200px] rounded-2xl border border-stone-700"
            src={imageUrl}
            alt=""
          />
        )}
        <div className="mt-1 grid grid-cols-4">
          <button className="group flex w-14 items-center text-xs text-stone-400">
            <ChatBubbleOvalLeftIcon
              height={35}
              width={35}
              className={`rounded-full p-2 text-stone-400
                    transition
                    ease-out
                    hover:bg-stone-700
                    hover:text-blue-400`}
            />
            <p
              className="text-xs transition ease-out
                  group-hover:text-blue-400"
            >
              {comments.length > 0 && comments.length}
            </p>
          </button>
          <button
            onClick={handleShare}
            className="group flex w-14 items-center text-xs text-stone-400"
          >
            <ShareIcon
              height={35}
              width={35}
              className={`rounded-full p-2 transition
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
            className="group flex items-center text-sm text-stone-400"
          >
            <HandThumbUpIcon
              height={35}
              width={35}
              className={`rounded-full p-2 transition
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
            className="group flex items-center text-sm text-stone-400"
          >
            <BookmarkIcon
              height={35}
              width={35}
              className={`rounded-full p-2 transition
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
  );
};

export default Post;
