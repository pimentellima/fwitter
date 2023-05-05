import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/router";
import defaultPicUrl from "../utils/defaultPicUrl";

const Comment = ({ comment: { author, title, createdAt }  }) => {
  const router = useRouter();

  const redirectToAuthor = (e) => {
    e.stopPropagation();
    router.push("/" + author.username);
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
