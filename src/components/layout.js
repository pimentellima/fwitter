import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
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

const Layout = ({ children }) => {
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
    <div className="grid grid-flow-row sm:grid-flow-col sm:justify-center bg-stone-800 ">
      <nav
        className="bg-inherit border-t flex flex-row sm:flex-col sticky bottom-0 sm:top-0 h-20 justify-center items-center sm:h-screen
                w-full sm:row-auto row-start-2 sm:w-24 xl:w-60 sm:border-r border-stone-700 sm:py-10 sm:justify-between "
      >
        <ul
          className="flex flex-row sm:flex-col text-2xl tracking-tight 
            transition-colors ease-out"
        >
          <li>
            <Link href="/" className="group flex justify-end xl:justify-normal">
              <div
                className={`flex items-center gap-3
              rounded-full px-5 py-3
               xl:after:content-['Inicio']
              group-hover:bg-stone-700 ${
                selectedPage === "Início" && "font-medium"
              }`}
              >
                <HomeIcon height={32} width={32} />
              </div>
            </Link>
          </li>
          <li>
            <Link
              href={`/${session?.user.username}`}
              className="group flex justify-end xl:justify-normal"
            >
              <div
                className={`flex items-center gap-3 
                rounded-full px-5 py-3
                 xl:after:content-['Perfil']
                group-hover:bg-stone-700 ${
                  selectedPage === session?.user.username && "font-medium"
                }`}
              >
                <UserIcon height={32} width={32} />
              </div>
            </Link>
          </li>
          <li>
            <Link
              href="/bookmarks"
              className="group flex justify-end xl:justify-normal"
            >
              <div
                className={`flex items-center gap-3 
                rounded-full px-5 py-3
                 xl:after:content-['Salvos']
                group-hover:bg-stone-700 ${
                  selectedPage === "Salvos" && "font-medium"
                }`}
              >
                <BookmarkIcon height={32} width={32} />
              </div>
            </Link>
          </li>
          <li>
          <div
            onClick={handleSignOut}
            className="hover:cursor-pointer group flex justify-end xl:justify-normal"
          >
            <div
              className={`flex items-center gap-3 
              rounded-full px-5 py-3
              group-hover:bg-stone-700`}
            >
              <ArrowLeftOnRectangleIcon
                width={32}
                height={32}
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
        className="flex min-h-[130vh] sm:w-[600px] flex-col 
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
        {children}
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
