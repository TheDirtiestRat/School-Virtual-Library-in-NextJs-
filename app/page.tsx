import Link from "next/link";
import AppTitle from "@/app/components/app-title";

export default function Home() {
    return (
        <div className="p-2 h-screen text-white">
            <div className="flex flex-col gap-2 h-full">
                <div className="basis-full grid grid-cols-4 grid-rows-4 gap-2 ">
                    <div className="bg-gray-400 hover:bg-gradient-to-br from-gray-100 to-blue-600 rounded-md flex justify-center items-center p-2 h-full md:row-span-4 row-span-2 md:col-span-2 col-span-4 relative">
                        {/* <h1 className="text-2xl font-bold text-center"></h1> */}
                        <h1 className="lg:text-3xl text-2xl font-semibold absolute bottom-3 right-3 text-end">Welcome to the <AppTitle /></h1>
                    </div>
                    <Link href="/library" className="bg-gray-400 hover:bg-gradient-to-br from-gray-100 via-blue-500 to-red-600 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5 flex justify-center items-center col-span-2 row-span-2 md:row-span-3">
                        <h1 className="text-2xl font-bold text-center">Go to Library</h1>
                    </Link>
                    <Link href="/about" className="bg-gray-400 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5 flex justify-center items-center col-span-2 md:col-span-1">
                        <h1 className="text-2xl font-bold text-center">About</h1>
                    </Link>
                    <Link href="/contact" className="bg-gray-400 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5 flex justify-center items-center col-span-2 md:col-span-1">
                        <h1 className="text-2xl font-bold text-center">Contact</h1>
                    </Link>
                </div>
                <div className="bg-gray-400 rounded-md basis-auto p-2 flex gap-2">
                    {/* <h1 className="text-2xl font-semibold text-end w-full">Developed by:</h1> */}
                </div>
            </div>
        </div>
    );
}
