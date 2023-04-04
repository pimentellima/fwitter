import { useClerk, useUser } from '@clerk/nextjs';
import { 
    HomeIcon,
    HashtagIcon,
    BookmarkIcon,
    CogIcon,
    UserIcon
 } from '@heroicons/react/24/outline';
import Link from "next/link";
import { useRouter } from 'next/router';

const NavigationBar = () => {
    const { user } = useUser();
    const router = useRouter();
    const { signOut } = useClerk();

    const handleSignOut = () => {
        router.push('/signin');
        signOut();
    }

    return(
        <nav className='py-10 w-60 border-r border-stone-700 
                sticky top-0 h-screen flex flex-col'>
            <ul className="flex flex-col gap-6 mb-10">
                <li>
                    <Link href='/' className='group'>
                        <div className='nav-item'>
                            <HomeIcon className='w-10 h-10'/>
                            Início
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href='/' className='group'>
                        <div className='nav-item'>
                            <HashtagIcon className='w-10 h-10'/>
                            Explorar
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href={`/${user?.username}`} className='group'>
                        <div className='nav-item'>
                            <UserIcon className='w-10 h-10'/>
                            Perfil
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href='/' className='group'>
                        <div className='nav-item'>
                            <BookmarkIcon className='w-10 h-10'/>
                            Salvos
                        </div>
                    </Link>
                </li>
                <li>
                    <Link href='/' className='group'>
                        <div className='nav-item'>
                            <CogIcon className='w-10 h-10'/>
                            Configurações
                        </div>
                    </Link>
                </li>
            </ul> 
            <button onClick={handleSignOut}>
                Sair
            </button>
        </nav>
    )
}

export default NavigationBar;
