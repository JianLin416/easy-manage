import React from 'react'

export default function Pagination({
  currentPage,
  totalPages,
  changePage,
}: {
  currentPage: number,
  totalPages: number,
  changePage: (page: number) => Promise<void>
}) {
  const handlePrevPage = async () => {
    if (currentPage > 1) {
      await changePage(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      await changePage(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex justify-center mt-5">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        上一页
      </button>
      <span className='mx-5'>
        第 {currentPage} 页，共 {totalPages} 页
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        下一页
      </button>
    </div>
  );
};