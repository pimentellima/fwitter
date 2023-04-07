import moment from "moment";

const ProfileView = (props) => {
  const {
    userLoggedIn,
    user,
    handleFollow,
    handleUnfollow,
    followers,
    following,
    isFollowedByUser,
  } = props;

  return (
    <div
      className="flex flex-col border-b 
                border-stone-700 pb-10"
    >
      <div className="relative h-64">
        <div className="h-44 w-full bg-stone-600" />
        <div
          className="absolute top-1/2 flex 
                        w-full items-end justify-between"
        >
          <img
            className="ml-2 h-28 w-28 
                            rounded-full hover:cursor-pointer"
            src={user.profileImageUrl}
            alt="profileImage"
          />
          {user.id === userLoggedIn?.id ? (
            <button
              onClick={() => {}}
              className="default-btn 
                            mr-2 h-10 rounded-full font-bold"
            >
              Editar perfil
            </button>
          ) : isFollowedByUser ? (
            <button
              onClick={handleUnfollow}
              className="default-btn 
                                mr-2 h-10 rounded-full font-bold"
            >
              Deixar de seguir
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className="default-btn 
                                mr-2 h-10 rounded-full font-bold"
            >
              Seguir
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 flex flex-col pl-5">
        <p className="text-2xl">{user.firstName + "  "}</p>
        <p className="text-stone-400">{"@" + user.username}</p>
        <p className="mt-3 text-stone-400">
          {`Juntou-se em ${moment(user.createdAt).format("ll")}`}
        </p>
        <div className="mt-2 flex gap-2 font-medium">
          <p className="first-letter:text-white">{`${following}  Seguindo`}</p>
          <p className="first-letter:text-white">
            {`${followers}  Seguidores`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
