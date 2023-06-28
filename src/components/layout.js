import {
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  HashtagIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  BookmarkIcon as BookmarkIconSolid,
  HashtagIcon as HashtagIconSolid,
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid
} from "@heroicons/react/24/solid";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Popup from "reactjs-popup";
import Spinner from "../components/spinner";
import CreatePost from "./createpost";

const FeaturedPostsBar = () => {
  const router = useRouter()
  const { data: featuredPosts, isLoading: isLoadingFeaturedPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("../api/post/featured").then((res) => res.data)
  );

  if (isLoadingFeaturedPosts) return <Spinner />;

  return (
    <>
      <span className="pl-4 text-lg font-bold">Receitas em alta</span>
      <div className="mt-5 flex flex-col">
        {featuredPosts?.length > 0 ? (
          featuredPosts
            .slice(0, 5)
            .map(({ title, imageUrl, author, likes, id }) => (
              <div
                key={id}
                onClick={() => router.push("/posts/" + id)}
                className="flex h-20 justify-between px-4 py-2 
                      last:rounded-b-2xl hover:cursor-pointer hover:bg-gray-200"
              >
                <div className="flex w-full flex-col ">
                  <span
                    className="overflow-hidden text-ellipsis 
                        whitespace-nowrap text-sm text-gray-500"
                  >
                    {author.name + " · " + likes.length + " curtidas"}
                  </span>
                  <span
                    className="max-w-[200px] overflow-hidden text-ellipsis 
                          whitespace-nowrap font-semibold"
                  >
                    {title}
                  </span>
                </div>
                {imageUrl && (
                  <img
                    className="aspect-square rounded-lg"
                    height={70}
                    width={70}
                    src={imageUrl}
                    alt=""
                  />
                )}
              </div>
            ))
        ) : (
          <span className="px-4 py-2">Não há receitas para exibir</span>
        )}
      </div>
    </>
  );
};

const Layout = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: featuredPosts, isLoading: isLoadingFeaturedPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("../api/post/featured").then((res) => res.data)
  );
  const { pathname, query } = useRouter();
  const [currentPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(() => {
      if (query.username) return query.username;
      if (query.pid) return "Fweet";
      switch (pathname) {
        case "/":
          return "Início";
        case "/featured":
          return "Explorar";
        case "/bookmarks":
          return "Salvos";
      }
    });
  }, [pathname, query]);

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/signin",
    });
  };

  return (
    <div className="grid grid-flow-row bg-white text-slate-950 sm:grid-flow-col sm:justify-center">
      <nav
        className="sticky bottom-0 row-start-2 flex h-11 justify-around border-t
          border-slate-200 bg-white sm:top-0 sm:row-auto
          sm:h-screen sm:flex-col sm:justify-start sm:border-r
          sm:border-t-0 sm:py-10 sm:pr-3 sm:text-2xl sm:tracking-tight xl:w-60"
      >
        <Link className="group flex justify-center sm:block" href="/">
          <div
            className={`flex w-fit items-center rounded-full p-1  group-hover:bg-gray-300 sm:gap-3 sm:px-5 sm:py-3 
              xl:after:content-['Inicio'] ${
                currentPage === "Início" && "font-medium"
              }`}
          >
            {currentPage === "Início" ? (
              <HomeIconSolid className="h-5 w-5" />
            ) : (
              <HomeIcon className="h-5 w-5" />
            )}
          </div>
        </Link>
        <Link className="group flex justify-center sm:block" href="/featured">
          <div
            className={`flex w-fit items-center rounded-full p-1 group-hover:bg-gray-300 sm:gap-3 sm:px-5 sm:py-3 
              xl:after:content-['Explorar'] ${
                currentPage === "Explorar" && "font-medium"
              }`}
          >
            {currentPage === "Explorar" ? (
              <HashtagIconSolid className="h-5 w-5" />
            ) : (
              <HashtagIcon className="h-5 w-5" />
            )}
          </div>
        </Link>
        <Link
          className="group flex justify-center sm:block"
          href={`/${session?.user.username}`}
        >
          <div
            className={`flex w-fit items-center rounded-full
                p-1 group-hover:bg-gray-300 sm:gap-3 sm:px-5 sm:py-3
                xl:after:content-['Perfil'] ${
                  currentPage === session?.user.username && "font-medium"
                }`}
          >
            {currentPage === session?.user.username ? (
              <UserIconSolid className="h-5 w-5" />
            ) : (
              <UserIcon className="h-5 w-5" />
            )}
          </div>
        </Link>
        <Link className="group flex justify-center sm:block" href="/bookmarks">
          <div
            className={`flex w-fit items-center rounded-full
                p-1 group-hover:bg-gray-300 sm:gap-3 sm:px-5 sm:py-3
                xl:after:content-['Salvos'] ${
                  currentPage === "Salvos" && "font-medium"
                }`}
          >
            {currentPage === "Salvos" ? (
              <BookmarkIconSolid className="h-5 w-5" />
            ) : (
              <BookmarkIcon className="h-5 w-5" />
            )}
          </div>
        </Link>

        <div className="absolute bottom-14 right-4 flex justify-center sm:static sm:mt-5">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center
              rounded-full bg-sky-500 p-5 text-base
              font-bold text-white transition duration-100 ease-out
              hover:bg-sky-600 focus:outline-none sm:py-2 xl:w-full"
          >
            <span className="hidden xl:inline">Fweet</span>
            <PencilSquareIcon width={22} height={22} className="xl:hidden" />
          </button>
        </div>
        <Popup
          overlayStyle={{
            backgroundColor: "rgba(0,0,0, 0.3)",
          }}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div
            className="z-20 flex h-screen w-screen flex-col gap-3 bg-white px-3
             py-4 text-slate-950 sm:h-auto sm:w-[500px] sm:rounded-2xl"
          >
            <button onClick={() => setModalOpen(false)}>
              <XMarkIcon className="h-10 w-10 rounded-full p-2 transition-all hover:bg-slate-100" />
            </button>
            <CreatePost />
          </div>
        </Popup>
        <div
          className="group flex justify-center hover:cursor-pointer 
        sm:mt-auto sm:block"
        >
          <div
            onClick={handleSignOut}
            className="flex w-fit items-center rounded-full
              p-1 group-hover:bg-gray-300 sm:gap-3 sm:px-5 sm:py-3"
          >
            <ArrowLeftOnRectangleIcon
              width={22}
              height={22}
              className="justify-self-center rounded-full hover:cursor-pointer"
            />
            <span className="hidden w-32 overflow-hidden text-ellipsis xl:inline">
              Sair
            </span>
          </div>
        </div>
      </nav>
      <div
        className="min-h-[130vh] w-screen
        sm:w-[580px] sm:border-r sm:border-slate-200"
      >
        <header
          className="sticky top-0 z-20 border-b
          border-slate-200 bg-white pb-4 pl-3 pt-2 text-xl font-medium"
        >
          <div
            className="hover:cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            {currentPage}
          </div>
        </header>
        {children}
      </div>
      <div
        className="sticky top-10 ml-4 hidden h-min min-h-[300px] w-80 rounded-2xl 
                  bg-gray-100 pt-2 lg:inline"
      >
        <FeaturedPostsBar />
      </div>
    </div>
  );
};

export default Layout;
