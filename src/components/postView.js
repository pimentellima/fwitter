import moment from "moment";
import "moment/locale/pt-br";

const PostView = ({ post, children }) => {
  const { author, createdAt, title, ingredients } = post;

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
          {ingredients?.map((ingredient, index) => (
            <p key={index} className="inline">
              {" "}
              {ingredient.qt + " " + ingredient.unity + " " + ingredient.name}
            </p>
          ))}
          {children}
        </div>
      </div>
    </div>
  );
};

export default PostView;
