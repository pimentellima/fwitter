import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  HomeIcon,
  PencilIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import Image from "next/image";
import Popup from "reactjs-popup";
import PostForm from "./postForm";

const Layout = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: featuredPosts, isLoading: isLoadingFeaturedPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("../api/post/featured").then((res) => res.data)
  );
  const { pathname, query } = useRouter();
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(() => {
      if (query.username) return query.username;
      if (query.pid) return "Fweet";
      switch (pathname) {
        case "/":
          return "Início";
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

  const handleClickHeader = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="grid grid-flow-row sm:grid-flow-col sm:justify-center bg-stone-800 scroll">
      <nav
        className="bg-inherit sticky border-t flex sm:border-t-0
          sm:flex-col bottom-0 sm:top-0 h-10
          sm:h-screen sm:row-auto row-start-2
          sm:border-r border-stone-700 sm:py-10 sm:justify-between"
      >
        <ul
          className="flex sm:flex-col w-full sm:gap-0 text-2xl tracking-tight 
            transition-colors ease-out items-center sm:items-start"
        >
          <li className="w-full group sm:block flex justify-center">
            <Link href="/">
              <div
                className={`flex items-center gap-3
              rounded-full p-1 sm:px-5 sm:py-3 w-fit
               xl:after:content-['Inicio']
              group-hover:bg-stone-700 ${
                selectedPage === "Início" && "font-medium"
              }`}
              >
                <HomeIcon height={22} width={22} />
              </div>
            </Link>
          </li>
          <li className="w-full group sm:block flex justify-center">
            <Link href={`/${session?.user.username}`}>
              <div
                className={`flex items-center gap-3 w-fit
                rounded-full p-1 sm:px-5 sm:py-3
                 xl:after:content-['Perfil']
                group-hover:bg-stone-700 ${
                  selectedPage === session?.user.username && "font-medium"
                }`}
              >
                <UserIcon height={22} width={22} />
              </div>
            </Link>
          </li>
          <li className="w-full group sm:block flex justify-center">
            <Link href="/bookmarks">
              <div
                className={`flex items-center gap-3 w-fit
                rounded-full p-1 sm:px-5 sm:py-3 
                 xl:after:content-['Salvos']
                group-hover:bg-stone-700 ${
                  selectedPage === "Salvos" && "font-medium"
                }`}
              >
                <BookmarkIcon height={22} width={22} />
              </div>
            </Link>
          </li>
          <li className="xl:block absolute right-4 bottom-14">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center
              justify-center rounded-full w-fit
              bg-stone-600 p-2 text-base font-bold
              transition duration-100 ease-out hover:bg-stone-500"
            >
              <span className="hidden xl:inline">Fweet</span>
              <PencilSquareIcon width={30} height={30} className="xl:hidden" />
            </button>
          </li>
          <Popup
            overlayStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.02)",
            }}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
          >
            <div
              className="h-screen w-screen sm:h-auto sm:w-[500px] bg-stone-800 py-4 px-3 sm:rounded-2xl
             flex flex-col gap-3"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="flex w-12 justify-self-center"
              >
                <XMarkIcon width={24} height={24} />
              </button>
              <div className="block sm:grid sm:grid-cols-[80px_auto]">
                <Image
                  className="hidden sm:block aspect-square justify-self-center rounded-full hover:cursor-pointer"
                  src={session?.user.imageUrl || defaultUserImg}
                  alt=""
                  width={50}
                  height={50}
                />
                <PostForm />
              </div>
            </div>
          </Popup>
          <li className="w-full group sm:block flex justify-center">
            <div onClick={handleSignOut} className="hover:cursor-pointer">
              <div
                className={`flex items-center gap-3 w-fit
              rounded-full p-1 sm:px-5 sm:py-3
              group-hover:bg-stone-700`}
              >
                <ArrowLeftOnRectangleIcon
                  width={22}
                  height={22}
                  className="justify-self-center rounded-full hover:cursor-pointer"
                />
                <span className="hidden xl:inline font-normal">
                  {"Sair de " + session?.user.name}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div
        className="flex min-h-[130vh]  sm:w-[580px] flex-col 
        sm:border-r sm:border-stone-700"
      >
        <header
          className="sticky top-0 z-20 border-b
          border-stone-700 bg-stone-800 pb-4 pl-3 pt-2 text-xl font-medium"
        >
          <div className="hover:cursor-pointer" onClick={handleClickHeader}>
            {selectedPage}
          </div>
        </header>
        <div>{children}</div>
      </div>
      <div
        className="hidden lg:inline sticky top-10 ml-4 h-min w-80 rounded-2xl 
                            bg-stone-700 pt-2 min-h-[300px]"
      >
        {isLoadingFeaturedPosts ? (
          <Spinner />
        ) : (
          <>
            <span className="pl-4 text-lg font-bold">Receitas em alta</span>
            <div className="mt-5 flex flex-col">
              {featuredPosts?.length > 0 ? (
                featuredPosts.map(({ title, imageUrl, author, likes, id }) => (
                  <div
                    key={id}
                    onClick={() => router.push("/posts/" + id)}
                    className="flex h-20 justify-between px-4 py-2 hover:cursor-pointer hover:backdrop-brightness-110"
                  >
                    <div className="flex w-full flex-col ">
                      <span className="flex gap-3 text-sm text-stone-400">
                        {author.name + " · " + likes.length + " curtidas"}
                      </span>
                      <span className="">{title}</span>
                    </div>
                    {imageUrl && (
                      <img
                        className="aspect-square rounded-lg"
                        height={80}
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
        )}
      </div>
    </div>
  );
};

export default Layout;
