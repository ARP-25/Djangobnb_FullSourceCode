import Image from 'next/image';
const Categories = () => {
    return (
        <div className=" cursor-pointer pb-6 flex items-center space-x-12">
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                <span className="text-xs">Beach</span>
            </div>
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                <span className="text-xs">Villas</span>
            </div>
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                <span className="text-xs">Cabins</span>
            </div>
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                <span className="text-xs">Tiny Homes</span>
            </div>
            <div className="pb-4 flex flex-col items-center space-y-2 border-b-2 border-white opacity-60 hover:border-gray-200 hover:opacity-100">
                <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                <span className="text-xs">Forest</span>
            </div>
        </div>
    );
};
export default Categories;
