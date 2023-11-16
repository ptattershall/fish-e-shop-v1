import Container from '../Container';
import Image from 'next/image';
import CartCount from './CartCount';
import Link from 'next/link';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getUser';
import { SafeUser } from '@/libs/types';

const NavBar = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className='sticky top-0 w-full z-40 bg-slate-200 shadow-sm'>
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className='flex justify-between items-center gap-3 md-gap-0'>
                        <Link href='/'>
                        <Image
                            alt="Mr. Fish Logo"
                            // Importing an image will
                            // automatically set the width and height
                            src='/logo.png'
                            className='object-contain w-20 h-20 md:w-24 md:h-24'
                            width={96}
                            height={96}
                        />
                        </Link>
                        <div className='hidden md:block'>
                            Search
                        </div> 
                        <div className='flex items-center gap-8 md:gap-12'>
                            <div className='rounded-full hover:bg-slate-50 p-2 hover:border-[1px] hover:border-slate-400 hover:shadow-md hover:translate-x-[1px]'>
                                <CartCount />
                            </div>
                            <UserMenu currentUser = {currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default NavBar;