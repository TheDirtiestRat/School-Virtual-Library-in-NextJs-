"use client";
import Link from "next/link";
import { Component, useRef, useState } from "react";
import { getSheetData, searchSheetData, searchFirstLetterSheetData } from "@/api/google-sheets";
import React, { useEffect } from 'react';
import { letterList, categoryList } from "@/constant/system-const";
import Image from 'next/image';

// import CategorySideBar from "@/app/components/categories-sidebar";
// import SideBar from "@/app/components/library-sidebar";
import AppTitle from "@/app/components/app-title";


export default function Page() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [listOfBooks, setlistOfBooks] = useState<Book[]>([]);
  // const [catogories, setCategories] = useState<Category[]>([]);

  interface Book {
    isbn: string,
    title: string,
    thumbnail: string,
  }


  // load function on page load
  useEffect(() => {
    updateBooksList();
    // getListOfCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // for searching books
  const showSearchResults = async () => {
    if (inputSearchRef.current) {
      // use the search key in the google sheets
      console.log("This is the search key: ", inputSearchRef.current.value);

      // get the search books
      const data: string[] = await searchSheetData("Books", "A2:C", inputSearchRef.current.value, 1);

      // list them down
      setlistOfBooks(getListOfBooks(data));
    }
  };

  const searchByLetters = async (character: string) => {
    // get the search books
    const data: string[] = await searchFirstLetterSheetData("Books", "A2:C", character, 1);

    // list them down
    setlistOfBooks(getListOfBooks(data));
  }

  // search by categories
  const searchByCategory = async (category: string) => {
    // get the search books
    const data: string[] = await searchFirstLetterSheetData("Books", "A2:D", category, 3);

    // list them down
    setlistOfBooks(getListOfBooks(data));
  }

  // for updating books
  const updateBooksList = async () => {
    const data: Array<string> = await getSheetData("Books", "A2:C");

    setlistOfBooks(getListOfBooks(data));
  }

  // for transforming the string array into an object books
  const getListOfBooks = (data: string[]) => {
    const list: Book[] = [];
    for (let index = 0; index < data.length; index++) {
      const book: Book = {
        isbn: data[index][0],
        title: data[index][1],
        thumbnail: data[index][2],
      }
      list.push(book)
    }
    return list;
  }

  let sibarElement = useRef<HTMLDivElement>(null);

  // const toggle sidebar
  const toggleSidebar = () => {
    sibarElement.current?.classList.toggle('hidden');
  }

  return (
    <div className="p-2 h-screen w-screen text-white ">
      <div className="flex flex-row gap-2 w-full h-full overflow-auto">
        {/*sidebar*/}
        <div ref={sibarElement} className="basis-auto bg-gray-600 rounded-md flex flex-col gap-2 min-w-[250] p-2 h-full z-10 overflow-y-auto lg:flex">
          <div className="basis-full flex flex-col gap-2 bg-gray-400 rounded-md p-2">
            <h1 className="text-3xl font-semibold">
              <Link href="/">
                <AppTitle />
              </Link>
            </h1>
            {/* close sidebar button */}
            <button onClick={toggleSidebar} className="bg-gray-300 basis-auto text-gray-600 hover:bg-gray-500 hover:text-gray-400 rounded-xl focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 flex justify-center items-center whitespace-nowrap p-2 px-4 md:hidden">
              Close
            </button>
          </div>
          <div className="basis-auto flex flex-col gap-2">
            {/* link navigation */}
            {categoryList.map((category) => (
              <button key={category.id} onClick={() => searchByCategory(category.title)} className="bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-200 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 basis-full flex justify-center items-center whitespace-nowrap p-2">
                {category.title}
              </button>
            ))}
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

        {/* main page */}
        <div className="basis-full flex flex-col gap-2 w-full h-full">
          <div className="basis-full flex flex-col gap-2 w-full h-full">
            {/* mobile navigation */}
            <div className="bg-gray-400 rounded-md p-2 basis-auto lg:hidden">
              <div className="flex flex-row gap-2 justify-between items-center">
                <h1 className="text-lg">
                  <Link href="/">
                    <AppTitle />
                  </Link>
                </h1>
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" onClick={toggleSidebar}>Open</button>
              </div>
            </div>

            {/* search bar */}
            <div className="basis-auto bg-gray-400 rounded-md p-2 flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2">

                <input className="bg-gray-300 w-full text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" placeholder="Search book..." type="text" id="SearchBooksBar" onChange={showSearchResults} ref={inputSearchRef} />
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" onClick={showSearchResults}>Search</button>
              </div>
              {/* letter list */}
              <div className="basis-full flex flex-row justify-between gap-1 w-full overflow-x-auto pb-1 pt-1">
                {letterList.map((char) => (
                  <button key={char.index} className="hover:text-gray-800 text-gray-300 hover:bg-gray-300 rounded-md focus:bg-gray-300 focus:text-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" onClick={() => searchByLetters(char.letter)}>{char.letter}</button>
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
              Total Books: {listOfBooks.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
