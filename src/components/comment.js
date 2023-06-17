import moment from "moment";
import defaultUserImg from '../../public/static/defaultUserImg.jpg'
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import Image from "next/image";

const Comment = ({ comment: { author, title, createdAt }  }) => {
  const router = useRouter();

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
  };

  return (
    <div className="grid grid-cols-[80px,minmax(0px,1fr)] py-3">
      <Image
        className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
        width={40}
        height={40}
        onClick={redirectToAuthor}
        src={author.imageUrl || defaultUserImg}
        alt=""
      />
      <div className="mr-6 flex w-full flex-col">
        <div className="flex justify-between">
          <div
            onClick={redirectToAuthor}
            className="flex items-center gap-2 hover:cursor-pointer"
          >
            <span
              className=" overflow-hidden text-ellipsis whitespace-nowrap
               font-bold hover:cursor-pointer hover:underline"
            >
              {author.name}
            </span>
            <div
              className="flex flex-row gap-1 
                                  text-sm text-stone-400 hover:cursor-pointer"
            >
              <p>{"@" + author.username}</p>
              <p> {" · " + moment(createdAt).fromNow(true)}</p>
            </div>
          </div>
        </div>
        <p className="my-1 text-xl">{title}</p>
      </div>
    </div>
  );
};

export default Comment;
