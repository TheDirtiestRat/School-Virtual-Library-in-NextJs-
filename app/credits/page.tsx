"use client"
import Link from "next/link";
import AppTitle from "@/app/components/app-title";

export default function Page() {

    return (
        <div className="p-2 h-screen text-white">
            <div className="flex flex-col gap-2 h-full">
                <div className="basis-auto bg-gray-400 rounded-md flex flex-row justify-between p-3">
                    <h1 className="text-3xl font-semibold">
                        Credits
                    </h1>
                    <Link href="/" className="bg-gray-300 hover:bg-gray-300 text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
                        Back
                    </Link>
                </div>
                <div className="flex lg:flex-row flex-col gap-2 h-full">
                    <div className="basis-full bg-gray-400 rounded-md p-3 lg:p-4 h-full relative">
                        <h1 className="text-2xl font-semibold">Main Developer</h1>
                        <p className="">Mr. Dirty Rat</p>

                        <h1 className="text-2xl font-semibold">Contributors</h1>
                        <p className="">--</p>
                        <p className="">--</p>

                        <h1 className="text-2xl font-semibold absolute bottom-3 right-3"><AppTitle /></h1>
                    </div>
                    <div className="basis-full bg-gray-400 rounded-md p-3 lg:p-4 h-full">
                        <h1 className="text-2xl font-semibold">Technologies Used:</h1>
                        <p className="">React</p>
                        <p className="">Next.js</p>
                        <p className="">Tailwind CSS</p>

                        <h1 className="text-2xl font-semibold">Other Libraries Used:</h1>
                        <p className="">--</p>
                        <p className="">--</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
