import { useUser } from "@clerk/nextjs";
import {
  HomeIcon,
  HashtagIcon,
  BookmarkIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const PageName = () => {
  const { pathname, query } = useRouter();
  if (pathname === "/") return <p>Início</p>;
  if (pathname === "/explore") return <p>Explorar</p>;
  if (query) return <p>Perfil</p>;
  if (pathname === "/bookmarks") return <p>Salvos</p>;
  if (pathname === "/settings") return <p>Configurações</p>;
};

const Layout = ({ children }) => {
  const { user: userLoggedIn } = useUser();

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
                className="mr-3 flex items-center gap-3 
              rounded-full px-5 py-4 text-2xl font-normal
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700"
              >
                <HomeIcon className="h-8 w-8" />
                Início
              </div>
            </Link>
          </li>
          <li>
            <Link href="/" className="group flex">
              <div
                className="mr-3 flex items-center gap-3 
              rounded-full px-5 py-4 text-2xl font-normal
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700"
              >
                <HashtagIcon className="h-8 w-8" />
                Explorar
              </div>
            </Link>
          </li>
          <li>
            <Link href={`/${userLoggedIn?.username}`} className="group flex">
              <div
                className="mr-3 flex items-center gap-3 
              rounded-full px-5 py-4 text-2xl font-normal
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700"
              >
                <UserIcon className="h-8 w-8" />
                Perfil
              </div>
            </Link>
          </li>
          <li>
            <Link href="/" className="group flex">
              <div
                className="mr-3 flex items-center gap-3 
              rounded-full px-5 py-4 text-2xl font-normal
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700"
              >
                <BookmarkIcon className="h-8 w-8" />
                Salvos
              </div>
            </Link>
          </li>
          <li>
            <Link href="/" className="group flex">
              <div
                className="mr-3 flex items-center gap-3 
              rounded-full px-5 py-4 text-2xl font-normal
              tracking-tight transition-colors ease-out 
              group-hover:bg-stone-700"
              >
                <CogIcon className="h-8 w-8" />
                Configurações
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div
        className="flex min-h-[130vh] w-[600px] flex-col 
                    border-r border-stone-700"
      >
        <header
          className="sticky top-0 z-20 border-b
          border-stone-700 bg-stone-800 pb-4 pl-3 pt-2 text-xl font-medium"
        >
          <PageName />
        </header>
        {children}
      </div>
      <div
        className="sticky top-10 ml-4  h-60 w-60 rounded-2xl 
                            bg-stone-700 p-3"
      >
        <p className="text-lg font-bold">Receitas em alta</p>
      </div>
    </div>
  );
};

export default Layout;
