"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { getSheetData, searchSheetData, searchFirstLetterSheetData } from "@/api/google-sheets";
import React, { useEffect } from 'react';
import { letterList } from "@/constant/system-const";
import Image from 'next/image';

// import CategorySideBar from "@/app/components/categories-sidebar";
import SideBar from "@/app/components/library-sidebar";
import AppTitle from "@/app/components/app-title";
import Pagination from "@/app/components/pagination";


export default function Page() {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [listOfBooks, setlistOfBooks] = useState<Book[]>([]);

  // for rendering
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);

  interface Book {
    isbn: string,
    title: string,
    thumbnail: string,
  }

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

  // pagination values and functions
  const itemsPerPage = 12;
  let items = listOfBooks;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  // const [currentItems, setcurrentItems] = useState<Book[]>([]);
  // const currentItems = items.slice(
  //   (currentPage - 1) * itemsPerPage,
  //   currentPage * itemsPerPage
  // );

  const pageClick = (page: number) => {

    setCurrentPage(page);
    const curItems = items.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    
    setCurrentBooks(curItems);

    // setcurrentItems(curItems);
    // renderListOfBooks(currentItems);

    // console.log(currentPage);
    // console.log(curItems);
    // console.log(items);
  }

  // for updating books
  const updateBooksList = async () => {
    const data: Array<string> = await getSheetData("Books", "A2:C");
    
    setlistOfBooks(getListOfBooks(data));

    const allbooks = getListOfBooks(data);
    const curItems = allbooks.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentBooks(curItems);
    
    // console.log("Listed Books: ", allbooks);
    // console.log("Current Loaded Books: ", curItems);
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

  // const toggle sidebar
  const mobileSibarElement = useRef<HTMLDivElement>(null);
  const toggleMobileSidebar = () => {
    mobileSibarElement.current?.classList.toggle('hidden');
  }

  // load function on page load
  useEffect(() => {
    updateBooksList();
    // getListOfCategories();
  }, []);


  return (
    <div className="p-2 h-screen w-screen text-white relative">
      <div className="flex flex-row gap-2 w-full h-full">
        {/*sidebar*/}
        <div className="basis-auto lg:flex h-full hidden">
          <SideBar onCallParent={searchByCategory} />
        </div>

        {/* main page */}
        <div className="basis-full flex flex-col gap-2 w-full h-full">
          <div className="basis-full flex flex-col gap-2 w-full h-full">
            {/* mobile navigation */}
            <div className="bg-gray-400 rounded-md p-2 basis-auto lg:hidden">
              <div className="flex flex-row gap-2 justify-between items-center">
                <h1 className="text-3xl font-semibold">
                  <Link href="/">
                    <AppTitle />
                  </Link>
                </h1>
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 px-4" onClick={toggleMobileSidebar}>Open</button>
              </div>
            </div>

            {/* search bar */}
            <div className="basis-auto bg-gray-400 rounded-md p-2 flex flex-col gap-2 w-full">
              <div className="flex flex-row gap-2">

                <input className="bg-gray-300 w-full text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2" placeholder="Search book..." type="text" id="SearchBooksBar" onChange={showSearchResults} ref={inputSearchRef} />
                <button className="bg-gray-300 text-gray-500 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 px-4" onClick={showSearchResults}>Search</button>
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
                {currentBooks.map((book) => (
                  <Link key={book.isbn} href={{ pathname: "library/book/", query: { isbn: book.isbn, title: book.title } }} className="w-auto h-auto rounded-md text-center flex hover: hover:ring-gray-600 hover:text-gray-200 text-gray-800 hover:bg-gray-400 hover:ring-3 focus:ring-gray-500 overflow-hidden shadow-lg justify-center items-center">
                    <Image src={book.thumbnail} alt={book.title} priority={true} width={300} height={300} className="h-full w-full" />
                  </Link>
                ))}
                {/* {listOfBooks.map((book) => (
                  <Link key={book.isbn} href={"library/book"} className="w-auto h-auto rounded-md text-center flex hover: hover:ring-gray-600 hover:text-gray-200 text-gray-800 hover:bg-gray-400 hover:ring-3 focus:ring-gray-500 overflow-hidden shadow-lg justify-center items-center">
                    <Image src={book.thumbnail} alt={book.title} loading="lazy" width={300} height={300} className="h-full w-full" />
                  </Link>
                ))} */}
              </div>
            </div>

            {/* footer */}
            <div className="basis-auto flex flex-row gap-2">
              <div className="basis-auto bg-gray-400 rounded-md p-2 flex flex-row justify-between items-center gap-2 w-full">
                Total Books: {listOfBooks.length}
              </div>
              <div className="basis-auto whitespace-nowrap">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={pageClick}
                />
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* secondary sidebar for mobile */}
      <div ref={mobileSibarElement} className="absolute gap-2 top-0 bottom-0 left-0 right-0 z-40 hidden lg:hidden">
        <div className="bg-white/30 backdrop-invert backdrop-opacity-10 rounded-md h-full w-full relative p-2 -z-30">
          <SideBar onCallParent={searchByCategory} />
          <button className="bg-gray-600 text-gray-300 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 p-2 px-4 absolute top-2 right-2 shadow-md" onClick={toggleMobileSidebar}>Close</button>
        </div>
      </div>
    </div>
  );
}
