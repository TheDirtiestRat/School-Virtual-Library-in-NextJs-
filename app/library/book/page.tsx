import Link from "next/link";

export default function Home() {
    return (
        <div className="p-2 h-screen text-white">
            <div className="flex flex-col gap-2 h-full">
                <div className="bg-gray-400 rounded-md flex p-2">
                    <Link href="/library" className="bg-gray-300 hover:bg-gray-300 text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
                        Back
                    </Link>
                </div>
                <div className="flex md:flex-row flex-col-reverse  gap-2 h-full">
                    <div className="basis-full bg-gray-400 rounded-md flex justify-center items-center p-2 h-full">
                        <h1 className="text-2xl font-bold text-center">Book Info</h1>
                    </div>
                    <div className="basis-full bg-gray-400 rounded-md flex justify-center items-center p-2 h-full">
                        <h1 className="text-2xl font-bold text-center">Book Graphic</h1>
                    </div>
                </div>
            </div>

        </div>
    );
}
