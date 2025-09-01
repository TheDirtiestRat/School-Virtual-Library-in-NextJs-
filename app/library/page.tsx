"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { getSheetData } from "@/api/google-sheets";
import React, { useEffect } from 'react';
import { letterList } from "@/constant/system-const";
import Image from 'next/image';

export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [listOfBooks, setlistOfBooks] = useState<Book[]>([]);
  const [catogories, setCategories] = useState<Category[]>([]);

  interface Book {
    isbn: string,
    title: string,
    thumbnail: string,
  }

  interface Category {
    id: string,
    title: string,
    href: string,
  }

  // load function on page load
  useEffect(() => {
    updateBooksList();
    getListOfCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // for searching books
  const showSearchResults = () => {
    if (inputSearchRef.current) {
      console.log("This is the search key: ", inputSearchRef.current.value);
    }
  };

  // for updating books
  const updateBooksList = async () => {
    const data: Array<string> = await getSheetData("Books", "A:C");

    setlistOfBooks(getListOfBooks(data));
  }

  // for transforming the string array into an object books
  const getListOfBooks = (data: string[]) => {
    const list: Book[] = [];
    for (let index = 0; index < data.length; index++) {
      if (index != 0) {
        const book: Book = {
          isbn: data[index][0],
          title: data[index][1],
          thumbnail: data[index][2],
        }
        list.push(book)
      }
    }
    return list;
  }

  const getListOfCategories = async () => {
    const data: Array<string> = await getSheetData("Categories", "A:B");

    setCategories(() => {
      const list: Category[] = [];
      for (let index = 0; index < data.length; index++) {
        if (index != 0) {
          list.push({
            id: data[index][0],
            title: data[index][1],
            href: `/${data[index][1]}`,
          })
        }
      }
      return list;
    });
  }

  return (
    <div className="p-2 h-screen text-white">
      <div className="flex flex-row gap-2 w-full h-full">
        {/*desktop navigation*/}
        <div className="basis-auto md:flex flex-col gap-2 hidden min-w-[200]">
          <div className="bg-gray-400 rounded-md p-2">
            <Link href="/">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">School Virtual Library</h5>
            </Link>
          </div>
          <div className="basis-full flex flex-col gap-2">
            {/* link navigation */}
            {catogories.map((item) => (
              <Link key={item.id} href={item.href} className="bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-200 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 basis-full flex justify-center items-center">
                {item.title}
              </Link>
            ))}
          </div>
          <div className="basis-auto flex flex-col gap-2">
            <Link href="/" className="bg-gray-500 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
              Credits
            </Link>
            <Link href="/" className="bg-gray-500 hover:bg-gray-300 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-5">
              Back
            </Link>
          </div>
        </div>

        {/* main page */}
        <div className="basis-full flex flex-col gap-2 w-full h-full">
          <div className="basis-full flex flex-col gap-2 w-full h-full">
            {/* mobile navigation */}
            <div className="bg-gray-400 rounded-md p-2 basis-auto md:hidden">
              <div className="flex flex-row justify-between items-center">
                <Link href="/" className=" bg-gray-300 text-gray-500 hover:text-white hover:bg-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-4">
                  Back
                </Link>
                <button onClick={toggleMobileMenu} className=" bg-gray-300 text-gray-500 hover:text-white hover:bg-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 px-4">
                  Dropdown
                </button>
              </div>

              {isMobileMenuOpen && (
                <div className="basis-auto flex flex-col gap-2 overflox-x-auto mt-2">
                  <hr />
                  <h5 className="text-2xl font-bold tracking-tight text-white">School Virtual Library</h5>
                  <div className="basis-auto w-full overflow-x-auto p-1">
                    <div className="basis-full flex flex-row gap-2">
                      {/* link navigation */}
                      {catogories.map((item) => (
                        <Link key={item.id} href={item.href} className="bg-gray-300 hover:bg-gray-200 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 whitespace-nowrap">
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* search bar */}
            <div className="basis-auto bg-gray-400 rounded-md p-2 flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2">
                <input className="bg-gray-300 w-full text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" placeholder="Search book..." type="text" id="SearchBooksBar" ref={inputSearchRef} />
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" onClick={showSearchResults}>Search</button>
              </div>
              {/* letter list */}
              <div className="basis-full flex flex-row justify-between gap-1 w-full overflow-x-auto pb-1 pt-1">
                {letterList.map((char) => (
                  <button key={char.index} className="hover:text-gray-800 text-gray-300 hover:bg-gray-300 rounded-md focus:bg-gray-300 focus:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" onClick={showSearchResults}>{char.letter}</button>
                ))}
              </div>
            </div>

            {/* books */}
            <div className="basis-full overflow-y-auto h-full">
              {/* each books */}
              <div className="grid md:grid-cols-6 grid-cols-2 gap-3 p-1">
                {listOfBooks.map((book) => (
                  <Link key={book.isbn} href={"library/book"} className="w-auto h-auto rounded-md text-center flex hover: hover:ring-gray-600 hover:text-gray-200 text-gray-800 hover:bg-gray-400 hover:ring-3 focus:ring-gray-500 overflow-hidden shadow-lg justify-center items-center">
                    <Image src={book.thumbnail} alt={book.title} width={200} height={250} />

                  </Link>
                ))}
              </div>
            </div>

            {/* footer */}
            <div className="basis-auto bg-gray-400 rounded-md p-2 flex flex-row justify-between items-center gap-2 w-full">
              Total Books: 9909
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
