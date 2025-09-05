"use client"

export default function Loading () {

    return (
        <div className="p-2 h-screen text-gray-800">
            <div className="flex flex-col gap-2 h-full">
                <div className="flex md:flex-row flex-col-reverse  gap-2 h-full">
                    <div className="basis-full bg-gray-200 rounded-md p-2 flex flex-col justify-center items-center gap-2 h-full">
                        <h1 className="text-2xl font-bold text-center">Loading...</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
