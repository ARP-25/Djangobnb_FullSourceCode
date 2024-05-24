import Image from "next/image";

interface CategoriesProps {
    dataCategory: string;
    setCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ dataCategory, setCategory }) => {
    return (
        <>
            <div className="pt-3 cursor-pointer pb-6 flex items-center space-x-12">
                {" "}
                <div
                    onClick={() => setCategory("Beach")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory == "Beach" ? "border-gray-800" : "border-white"
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                    <span className="text-xs">Beach</span>
                </div>
                <div
                    onClick={() => setCategory("Villas")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory == "Villas" ? "border-gray-800" : "border-white"
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                    <span className="text-xs">Villas</span>
                </div>
                <div
                    onClick={() => setCategory("Cabins")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory == "Cabins" ? "border-gray-800" : "border-white"
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                    <span className="text-xs">Cabins</span>
                </div>
                <div
                    onClick={() => setCategory("Tiny Homes")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory == "Tiny Homes" ? "border-gray-800" : "border-white"
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                    <span className="text-xs">Tiny Homes</span>
                </div>
                <div
                    onClick={() => setCategory("Forest")}
                    className={`pb-4 flex flex-col items-center space-y-2 border-b-2 ${
                        dataCategory == "Forest" ? "border-gray-800" : "border-white"
                    } opacity-60 hover:border-gray-200 hover:opacity-100`}
                >
                    <Image src="/icon_beach.jpg" alt="Category Beach" width={40} height={40} />
                    <span className="text-xs">Forest</span>
                </div>
            </div>
        </>
    );
};

export default Categories;
