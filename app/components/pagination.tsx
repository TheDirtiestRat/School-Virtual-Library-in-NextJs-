"use client"

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="bg-gray-400 rounded-md flex flex-row justify-end h-full p-2">
            <div className="flex flex-row gap-2">
                {pages.map(page => (
                    <button key={page} onClick={() => onPageChange(page)} className="bg-gray-300 rounded-md p-2 px-3 focus:ring-3 focus:outline-none focus:ring-gray-500">
                        {page}
                    </button>
                ))}

                <div className="p-2 px-3">
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
}

export default Pagination;