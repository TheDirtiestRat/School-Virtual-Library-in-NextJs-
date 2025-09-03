// import { searchSheetData } from "@/api/google-sheets";

interface Category {
    id: string,
    title: string,
}

const categoryList: Category[] = [
    {
        id: "101",
        title: "Technology",
    },
    {
        id: "102",
        title: "Science",
    },
    {
        id: "103",
        title: "Social Sciences",
    },
    {
        id: "104",
        title: "Philosophy and Religion",
    },
];

const CategoryList = () => {

    return (
        categoryList.map((category) => (
            <button key={category.id} className="bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-200 rounded-md focus:ring-4 focus:outline-none focus:ring-gray-500 md:p-1 basis-full flex justify-center items-center whitespace-nowrap p-2 hover:shadow-md">
                {category.title}
            </button>
        ))
    );
}

export default CategoryList;