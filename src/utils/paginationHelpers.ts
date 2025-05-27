export const handleNextPage = ({
  currentIndex,
  setCurrentIndex,
  itemsPerPage,
  currentPage,
  totalPages,
  setCurrentPage,
  fetchData,
  dataList,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  fetchData: (page: number) => Promise<void>;
  dataList: any[];
}) => {
  if (currentIndex + itemsPerPage < dataList.length) {
    setCurrentIndex(currentIndex + itemsPerPage);
  } else if (currentPage < totalPages) {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    fetchData(nextPage).then(() => {
      setCurrentIndex(currentIndex + itemsPerPage);
    });
  }
};

export const handlePrevPage = ({
  currentIndex,
  setCurrentIndex,
  itemsPerPage,
}: {
  currentIndex: number;
  setCurrentIndex: (index: number | ((prevIndex: number) => number)) => void;
  itemsPerPage: number;
}) => {
  if (currentIndex > 0) {
    setCurrentIndex((prevIndex: number) =>
      Math.max(prevIndex - itemsPerPage, 0),
    );
  }
};
