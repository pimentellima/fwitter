import {
  BookmarkIcon,
  CogIcon,
  HashtagIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoggedUser } from "../hooks/useLoggedUser";

const Layout = ({ children }) => {
  const { data: loggedUser } = useLoggedUser();

  const router = useRouter();
  const { pathname, query } = useRouter();
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(() => {
      if (query.username) return query.username;
      if (query.pid) return "Fweet";
      switch (pathname) {
        case "/":
          return "Início";
        case "/explore":
          return "Explorar";
        case "/bookmarks":
          return "Salvos";
        case "/settings":
          return "Configurações";
      }
    });
  }, [pathname, query]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/signin");
  };

  const handleClickHeader = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-row justify-center bg-stone-800">
      <nav
        className="sticky top-0 flex h-screen 
                w-60 flex-col border-r border-stone-700 py-10"
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
            <Link href="/" className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl 
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === "Explorar" && "font-medium"
              }`}
              >
                <HashtagIcon className="h-8 w-8" />
                Explorar
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${loggedUser?.username}`} className="group flex">
              <div
                className={`mr-3 flex items-center gap-3 
              rounded-full px-5 py-3 text-2xl
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700 ${
                selectedPage === loggedUser?.username && "font-medium"
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
        <div className="flex gap-3 hover:bg-stone-500">
          <p>{loggedUser?.name}</p>
          <button onClick={handleSignOut}>Sair</button>
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
            <p>{selectedPage}</p>
          </div>
        </header>
        {children}
      </div>
      <div
        className="sticky top-10 ml-4 h-60 w-60 rounded-2xl 
                            bg-stone-700 px-4 py-2"
      >
        <p className="text-lg font-bold">Em alta</p>
      </div>
    </div>
  );
};

export default Layout;
