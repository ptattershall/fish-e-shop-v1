import Image from 'next/image';

export default function HomeBanner(){
    return (
        <div className="relative bg-gradient-to-r from-sky-500 to-sky-700 mb-8">
            <div className="mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-evenly">
                <div className="w-1/3 relative aspect-video">
                    <Image src='/logo.png' alt='Banner Image' className='object-contain' fill/>
                </div>
                <div className="mb-8 md:mb-0 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-200">Site Launch Sale!</h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-2">On purchases of $50 or more recieve free shipping +</p>
                    <p className="text-2xl md:text-5xl text-amber-100 font-bold">GET 10% OFF</p>
                </div>
            </div>
        </div>
    );
}