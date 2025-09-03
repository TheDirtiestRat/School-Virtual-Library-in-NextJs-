"use client";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const isbn: string | null = searchParams.get('isbn');

    interface BookIdentifier {
        type: string;
        identifier: string;
    }
    const [identifier, setIdentifier] = useState<BookIdentifier[]>([{ type: "Loading...", identifier: "Loading..." }]);

    const [authors, setAuthors] = useState<string>("Loading...");
    const [publisher, setPublisher] = useState<string>("Loading...");
    const [category, setCategory] = useState<string>("Loading...");
    const [description, setDescription] = useState<string>("Loading...");
    const [thumbnail, setThumbnail] = useState<string>("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093");

    const fetchBookByISBN = async (isbn: string) => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch book by ISBN:", error);
            return null;
        }
    };

    useEffect(() => {
        const main = async () => {
            const bookData = await fetchBookByISBN(isbn ?? "");

            if (bookData && bookData.items && bookData.items.length > 0) {
                const book = bookData.items[0];
                setIdentifier(book.volumeInfo.industryIdentifiers || []);
                setAuthors(book.volumeInfo.authors.join(", "));
                setPublisher(book.volumeInfo.publisher || "Unknown Publisher");
                setCategory(book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : "Unknown Category");
                setDescription(book.volumeInfo.description || "No description available.");
                setThumbnail(book.volumeInfo.imageLinks.thumbnail);

                // console.log(book.volumeInfo);
                // console.log(book.volumeInfo.industryIdentifiers);
                // console.log(book.volumeInfo.imageLinks.thumbnail)
                // console.log(`Title: ${book.volumeInfo.title}`);
                // console.log(`Author(s): ${book.volumeInfo.authors.join(", ")}`);
                // console.log(`Publisher: ${book.volumeInfo.publisher}`);
            } else {
                console.log(`No book found for ISBN: ${isbn}`);
            }
        };

        main();
    }, []);

    return (
        <div className="p-2 h-screen text-white">
            <div className="flex flex-col gap-2 h-full">
                <div className="basis-auto bg-gray-400 rounded-md flex p-2">
                    <Link href="/library" className="bg-gray-300 hover:bg-gray-300 text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 px-4">
                        Back
                    </Link>
                </div>
                <div className="basis-full grid grid-flow-row-dense grid-cols-3 grid-rows-3 gap-2 h-full">
                    <div className='bg-gray-500 rounded-md p-2 col-span-2'>
                        <h1 className="text-2xl font-bold">{title}</h1>
                        {/* <p className="">ISBN: {isbn}</p> */}
                        {identifier.map((id) => (
                            <p className="" key={id.type}>{id.type}: {id.identifier}</p>
                        ))}
                    </div>
                    {/* book thumbnail */}
                    <div className='rounded-md flex justify-center items-center lg:row-span-2 row-span-1 h-full overflow-hidden'>
                        <div className="rounded-xl overflow-hidden">
                            <Image src={thumbnail} alt={title ?? ""} priority={true} width={200} height={200} className="" />
                        </div>
                    </div>
                    {/* details */}
                    <div className='bg-gray-300 rounded-md text-gray-800 p-2 lg:col-span-2 col-span-full'>
                        <p className="">Authors: {authors}</p>
                        <p className="">Publisher: {publisher}</p>
                        <p className="">Category: {category}</p>
                    </div>
                    {/* description */}
                    <div className='bg-gray-400 rounded-md col-span-full overflow-auto h-full'>
                        <p className="h-full w-full p-4"><strong>Description: </strong> {description}</p>
                    </div>
                    {/* 
                    <div className="rounded-md flex flex-col gap-2 overflow-hidden max-h-max">
                        <Image src={thumbnail} alt={title ?? ""} priority={true} width={200} height={200} className="w-full" />
                    </div>

                    <div className='bg-gray-400 rounded-md p-2'>
                        <p className="">Authors: {authors}</p>
                        <p className="">Publisher: {publisher}</p>
                        <p className="">Category: {category}</p>
                    </div>

                    <div className='bg-gray-400 rounded-md p-3 overflow-y-auto'>
                        <p className=""><strong>Description: </strong> {description}</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
