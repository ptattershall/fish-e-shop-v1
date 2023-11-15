import Container from '../Container';
import Image from 'next/image';
import CartCount from './CartCount';


const NavBar = () => {
    return (
        <div className='sticky top-0 w-full z-40 bg-slate-200 shadow-sm'>
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className='flex justify-between items-center gap-3 md-gap-0'>
                        <Image
                            alt="Mr. Fish Logo"
                            // Importing an image will
                            // automatically set the width and height
                            src='/logo.png'
                            className='object-contain w-20 h-20 md:w-24 md:h-24'
                            width={96}
                            height={96}
                        />
                        <div className='hidden md:block'>
                            Search
                        </div> 
                        <div className='flex items-center gap-8 md:gap-12'>
                            <div>
                                <CartCount />
                            </div>
                            <div>UserMenu</div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default NavBar;