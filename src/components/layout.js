import {
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import defaultPicUrl from "../utils/defaultPicUrl";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: featuredPosts, isFetching: isFetchingFeaturedPosts } = useQuery(
    ["featuredPosts"],
    async () => await axios.get("api/post/featured").then((res) => res.data)
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
        case "/settings":
          return "Configurações";
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
    <div className="flex flex-row justify-center bg-stone-800">
      <nav
        className="sticky top-0 flex h-screen 
                w-60 flex-col border-r border-stone-700 pt-10"
      >
        <ul className="mb-10 flex flex-col">
          <li>
            <Link href="/" className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === "Início" && "font-medium"
              }`}
              >
                <HomeIcon className="h-8 w-8" />
                Início
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${session?.user.username}`} className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === session?.user.username && "font-medium"
              }`}
              >
                <UserIcon className="h-8 w-8" />
                Perfil
              </div>
            </Link>
          </li>
          <li>
            <Link href="/bookmarks" className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === "Salvos" && "font-medium"
              }`}
              >
                <BookmarkIcon className="h-8 w-8" />
                Salvos
              </div>
            </Link>
          </li>
          <li>
            <Link href="/" className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === "Configurações" && "font-medium"
              }`}
              >
                <CogIcon className="h-8 w-8" />
                Configurações
              </div>
            </Link>
          </li>
        </ul>
        <div
          onClick={handleSignOut}
          className="grid grid-cols-[45px,auto] items-center rounded-full p-2 hover:cursor-pointer hover:bg-stone-700 transition-colors"
        >
          <img
            className="aspect-square justify-self-center rounded-full hover:cursor-pointer"
            width={50}
            height={50}
            src={
              session?.user.imageUrl ? session.user.imageUrl : defaultPicUrl
            }
            alt=""
          />
          <div className="justify-self-center flex items-center gap-1 text-lg">
            <span className="font-normal">Sair de</span>
            <span className="font-medium">{session?.user.name}</span>
          </div>
        </div>
      </nav>
      <div
        className="flex min-h-[130vh] w-[600px] flex-col 
        border-r border-stone-700"
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
        className="sticky top-10 ml-4 h-min w-80 rounded-2xl 
                            bg-stone-700 pt-2"
      >
        {isFetchingFeaturedPosts ? (
          <div className="flex justify-center py-5">
            <Spinner />
          </div>
        ) : (
          <>
            <span className="pl-4 text-lg font-bold">Receitas em alta</span>
            <div className="mt-5 flex flex-col">
              {featuredPosts.map(({ title, imageUrl, author, likes, id }) => (
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
                      className="rounded-lg aspect-square"
                      height={80}
                      width={70}
                      src={imageUrl}
                      alt=""
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Layout;
