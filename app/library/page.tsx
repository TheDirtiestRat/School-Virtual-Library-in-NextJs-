"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { getSheetData } from "@/api/google-sheets";
import React, { useEffect } from 'react';
import { letterList } from "@/constant/system-const";

export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [listOfBooks, setlistOfBooks] = useState<Book[]>([]);
  const [catogories, setCategories] = useState<Category[]>([]);

  interface Book {
    isbn: string,
    title: string,
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

  const showSearchResults = () => {
    if (inputSearchRef.current) {
      console.log("This is the search key: ", inputSearchRef.current.value);
    }
  };

  const updateBooksList = async () => {
    const data: any = await getSheetData("Books", "A:B");

    setlistOfBooks(prevList => {
      const list = [];
      for (let index = 0; index < data.sheetdata.length; index++) {
        if (index != 0) {
          list.push({
            isbn: data.sheetdata[index][0],
            title: data.sheetdata[index][1],
          })
        }
      }
      return list;
    });

    // console.log(listOfBooks);
  }

  const getListOfCategories = async () => {
    const data: any = await getSheetData("Categories", "A:B");

    setCategories(catogories => {
      const list: Category[] = [];
      for (let index = 0; index < data.sheetdata.length; index++) {
        if (index != 0) {
          list.push({
            id: data.sheetdata[index][0],
            title: data.sheetdata[index][1],
            href: `/${data.sheetdata[index][1]}`,
          })
        }
      }
      return list;
    });
  }

  // const letterList = letterList;

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
            {/* {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-200 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-1 basis-full flex justify-center items-center">
                {item.name}
              </Link>
            ))} */}
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
                      {/* {navItems.map((item) => (
                        <Link key={item.name} href={item.href} className="bg-gray-300 hover:bg-gray-200 hover:text-gray-700 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 whitespace-nowrap">
                          {item.name}
                        </Link>
                      ))} */}
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
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 whitespace-nowrap" onClick={updateBooksList}>Get Books Data</button>
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
              <div className="flex flex-wrap gap-2 justify-evenly md:justify-start">
                {listOfBooks.map((book) => (
                  <Link key={book.isbn} href={"library/book"} className="w-[143] h-[207] md:w-[168] md:h-[265] bg-gray-400 rounded-md justify-center items-center text-center flex hover:bg-gray-300 hover:text-gray-600 ">
                    {book.title}
                  </Link>
                ))}
                {/* {booklist.map((book) => (
                  <Link key={book.isbn} href={"library/book"} className="w-[113] h-[177] md:w-[168] md:h-[265] bg-gray-400 rounded-md justify-center items-center text-center flex hover:bg-gray-300 hover:text-gray-600 ">
                    Book cover {book.title}
                  </Link>
                ))} */}
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
