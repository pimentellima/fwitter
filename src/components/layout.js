import {
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  HashtagIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Popup from "reactjs-popup";
import defaultUserImg from "../../public/static/defaultUserImg.jpg";
import Spinner from "../components/spinner";
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
    <div className="grid grid-flow-row bg-stone-800 sm:grid-flow-col sm:justify-center">
      <nav
        className="sticky bottom-0 row-start-2 flex h-11 justify-around border-t
          border-stone-700 bg-stone-800 sm:top-0 sm:row-auto sm:h-screen
          sm:flex-col sm:justify-start sm:border-r sm:border-t-0
          sm:py-10 sm:text-2xl sm:tracking-tight xl:w-60 "
      >
        <Link className="group flex justify-center sm:block" href="/">
          <div
            className={`flex w-fit items-center rounded-full p-1  group-hover:bg-stone-700 sm:gap-3 sm:px-5 sm:py-3 
              xl:after:content-['Inicio'] ${
                currentPage === "Início" && "font-medium"
              }`}
          >
            <HomeIcon height={20} width={20} />
          </div>
        </Link>
        <Link className="group flex justify-center sm:block" href="/featured">
          <div
            className={`flex w-fit items-center rounded-full p-1  group-hover:bg-stone-700 sm:gap-3 sm:px-5 sm:py-3 
              xl:after:content-['Explorar'] ${
                currentPage === "Explorar" && "font-medium"
              }`}
          >
            <HashtagIcon height={20} width={20} />
          </div>
        </Link>
        <Link
          className="group flex justify-center sm:block"
          href={`/${session?.user.username}`}
        >
          <div
            className={`flex w-fit items-center rounded-full
                p-1 group-hover:bg-stone-700 sm:gap-3 sm:px-5 sm:py-3
                xl:after:content-['Perfil'] ${
                  currentPage === session?.user.username && "font-medium"
                }`}
          >
            <UserIcon height={20} width={20} />
          </div>
        </Link>
        <Link className="group flex justify-center sm:block" href="/bookmarks">
          <div
            className={`flex w-fit items-center rounded-full
                p-1 group-hover:bg-stone-700 sm:gap-3 sm:px-5 sm:py-3
                xl:after:content-['Salvos'] ${
                  currentPage === "Salvos" && "font-medium"
                }`}
          >
            <BookmarkIcon height={20} width={20} />
          </div>
        </Link>

        <div className="absolute bottom-14 right-4 flex justify-center sm:static sm:mt-5">
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center
              rounded-full bg-stone-600
              p-5 text-base font-bold transition duration-100
              ease-out hover:bg-stone-500 sm:py-2 xl:w-full"
          >
            <span className="hidden xl:inline">Fweet</span>
            <PencilSquareIcon width={22} height={22} className="xl:hidden" />
          </button>
        </div>
        <Popup
          overlayStyle={{
            backgroundColor: "rgba(255, 255, 255, 0.02)",
          }}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div
            className="z-20 flex h-screen w-screen flex-col gap-3 bg-stone-800 px-3
             py-4 sm:h-auto sm:w-[500px] sm:rounded-2xl"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="flex w-12 justify-self-center"
            >
              <XMarkIcon width={24} height={24} />
            </button>
            <div className="grid sm:grid-cols-[80px,minmax(0px,1fr)]">
              <Image
                className="hidden aspect-square justify-self-center rounded-full hover:cursor-pointer sm:block"
                src={session?.user.imageUrl || defaultUserImg}
                alt=""
                width={40}
                height={40}
              />
              <PostForm closeModal={() => setModalOpen(false)} />
            </div>
          </div>
        </Popup>
        <div
          className="group flex justify-center hover:cursor-pointer 
        sm:mt-auto sm:block"
        >
          <div
            onClick={handleSignOut}
            className="flex w-fit items-center rounded-full
              p-1 group-hover:bg-stone-700 sm:gap-3 sm:px-5 sm:py-3"
          >
            <ArrowLeftOnRectangleIcon
              width={22}
              height={22}
              className="justify-self-center rounded-full hover:cursor-pointer"
            />
            <div className="hidden w-32 overflow-hidden text-ellipsis font-normal xl:inline">
              {"Sair de " + session?.user.name}
            </div>
          </div>
        </div>
      </nav>
      <div
        className="min-h-[130vh] w-screen
        sm:w-[580px] sm:border-r sm:border-stone-700"
      >
        <header
          className="sticky top-0 z-20 border-b
          border-stone-700 bg-stone-800 pb-4 pl-3 pt-2 text-xl font-medium"
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
                            bg-stone-700 pt-2 lg:inline"
      >
        {isLoadingFeaturedPosts ? (
          <Spinner />
        ) : (
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
                      className="flex h-20 justify-between px-4 py-2 hover:cursor-pointer hover:backdrop-brightness-110"
                    >
                      <div className="flex w-full flex-col ">
                        <span className="text-sm text-stone-400 
                        overflow-hidden text-ellipsis whitespace-nowrap">
                          {author.name + " · " + likes.length + " curtidas"}
                        </span>
                        <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {title}
                        </span>
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
