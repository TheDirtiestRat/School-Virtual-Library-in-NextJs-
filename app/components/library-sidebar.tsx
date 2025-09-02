import Link from "next/link";
import CategorySideBar from "@/app/components/categories-sidebar";
import AppTitle from "@/app/components/app-title";

import React, { useRef } from 'react';


const SideBar = () => {
    let sibarElement = useRef<HTMLDivElement>(null);

    // const toggle sidebar
    const toggleSidebar = () => {
        sibarElement.current?.classList.toggle('hidden');
    }

    return (
        <div ref={sibarElement} className="basis-auto bg-gray-100 rounded-md md:flex flex-col gap-2 min-w-[250] p-2 h-full fixed md:sticky z-20">
            <div className="basis-full flex flex-col gap-2 bg-gray-400 rounded-md p-2">
                <Link href="/">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        <AppTitle />
                    </h5>
                </Link>
                {/* close sidebar button */}
                <button onClick={toggleSidebar} className="bg-gray-300 basis-auto text-gray-600 hover:bg-gray-500 hover:text-gray-400 rounded-xl focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 flex justify-center items-center whitespace-nowrap p-2 px-4 md:hidden">
                    Close
                </button>
            </div>
            <div className="basis-auto flex flex-col gap-2">
                {/* link navigation */}
                <CategorySideBar />
            </div>
            <div className="basis-auto flex flex-col gap-2">
                <Link href="/credits" className="bg-gray-500 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
                    Credits
                </Link>
                <Link href="/" className="bg-gray-500 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
                    Back
                </Link>
            </div>
        </div>
    );
}

export default SideBar;