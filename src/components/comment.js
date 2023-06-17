import moment from "moment";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import Image from "next/image";

const Comment = ({ comment: { author, title, createdAt } }) => {
  const router = useRouter();

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
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
        {author.imageUrl && (
          <img
            className="max-h-96 max-w-[200px] rounded-2xl border border-stone-700"
            src={author.imageUrl}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Comment;
