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
    <div className="grid grid-cols-[80px_auto] mt-3">
      <Image
        className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
        width={40}
        height={40}
        src={author.imageUrl || defaultUserImg}
        alt="profileImage"
      />
      <div className="mr-6 flex flex-col ">
        <div className="flex justify-between w-full">
          <div
            onClick={redirectToAuthor}
            className="flex items-center gap-2 hover:cursor-pointer w-full"
          >
            <span className="font-bold hover:cursor-pointer hover:underline">
              {author.name}
            </span>
            <div
              className="flex flex-row gap-1 text-stone-400 hover:cursor-pointer"
            >
              <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                {`@${author.username} · ${moment(createdAt).fromNow(true)}`}
              </span>
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
          <div className="flex items-center justify-between mt-2 w-full ">
            <button className="group flex items-center text-xs text-stone-400">
              <ChatBubbleOvalLeftIcon height={35} width={35}
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
              className="group flex items-center text-xs text-stone-400"
            >
              <ShareIcon height={35} width={35}
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
              <HandThumbUpIcon height={35} width={35}
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
              <BookmarkIcon height={35} width={35}
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
    </div>
  );
};

export default Post;
