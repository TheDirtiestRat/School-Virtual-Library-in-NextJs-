import Link from "next/link";
// import CategorySideBar from "@/app/components/categories-sidebar";
import AppTitle from "@/app/components/app-title";

import { categoryList } from "@/constant/system-const";

import React, { useRef } from 'react';

interface ChildProps {
    onCallParent: (dataFromChild: string) => void;
}

const SideBar: React.FC<ChildProps> = ({ onCallParent }) => {
    const sibarElement = useRef<HTMLDivElement>(null);

    // const toggle sidebar
    // const toggleSidebar = () => {
    //     sibarElement.current?.classList.toggle('hidden');
    // }

    // call the parent function in the child
    // const handleClick = () => {
    //     onCallParent("Hello from Child!"); // Call the parent function
    // };

    return (
        <div ref={sibarElement} className="basis-auto bg-gray-200 p-2 rounded-md flex flex-col gap-2 min-w-[220] max-w-[250] h-full overflow-y-auto z-20">
            <div className="basis-full flex flex-col gap-2 bg-gray-400 relative rounded-md p-2">
                <Link href="/" className=" absolute bottom-0">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                        <AppTitle />
                    </h5>
                </Link>
                {/* close sidebar button */}
                {/* <button onClick={toggleSidebar} className="bg-gray-300 basis-auto text-gray-600 hover:bg-gray-500 hover:text-gray-400 rounded-xl focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 flex justify-center items-center whitespace-nowrap p-2 px-4 md:hidden">
                    Close
                </button> */}
            </div>
            <div className="basis-auto flex flex-col gap-2">
                {/* link navigation */}
                {categoryList.map((category) => (
                    <button key={category.id} onClick={() => onCallParent(category.title)} className="bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-200 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 basis-full flex justify-center items-center whitespace-nowrap p-2 hover:shadow-md">
                        {category.title}
                    </button>
                ))}
                {/* <CategorySideBar /> */}
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