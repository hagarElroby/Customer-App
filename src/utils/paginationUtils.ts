export interface PaginationHandlers {
  handleNext: () => void;
  handlePrev: () => void;
  handlePageClick: (pageNumber: number) => void;
}

export const usePagination = (
  currentPage: number,
  totalPages: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
): PaginationHandlers => {
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return { handleNext, handlePrev, handlePageClick };
};
