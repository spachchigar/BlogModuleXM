import Link from 'next/link';
import React from 'react';
interface paginationProps {
  currentPage: number;
  totalPage: number;
  currentSort: 'ASC' | 'DESC';
}
function Pagination({ currentPage, totalPage, currentSort }: paginationProps) {
  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {Array.from({ length: totalPage }).map((_, ind) => {
        const pageNumber = ind + 1;
        const isActive = currentPage === pageNumber;
        return (
          <Link
            key={ind}
            className={`rounded-xl px-4 py-2 text-gray-800 shadow-sm transition-all duration-200 focus:ring-2 focus:ring-gray-400 focus:outline-none ${
              isActive
                ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700 pointer-events-none'
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
            }`}
            scroll={false}
            href={`/blogs?page=${ind + 1}&sort=${currentSort}`}
          >
            {ind + 1}
          </Link>
        );
      })}
    </div>
  );
}

export default Pagination;
