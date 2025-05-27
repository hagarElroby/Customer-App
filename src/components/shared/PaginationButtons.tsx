"use client";
interface PaginationButtonsProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalDocs: number;
  onPageClick: (pageNumber: number) => void;
  onNext: () => void;
  onPrev: () => void;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  currentPage,
  // totalPages,
  limit,
  totalDocs,
  onPageClick,
  onNext,
  onPrev,
}) => {
  const startRecord = (currentPage - 1) * limit + 1;
  const endRecord = Math.min(currentPage * limit, totalDocs);
  const totalPages = Math.ceil(totalDocs / limit);
  const getPageRange = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const range: number[] = [];

    if (currentPage <= 3) {
      range.push(1, 2, 3, 4, totalPages);
    } else if (currentPage >= totalPages - 2) {
      range.push(1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      range.push(1, currentPage - 1, currentPage, currentPage + 1, totalPages);
    }

    return range;
  };

  const renderPageButtons = () => {
    const pages = getPageRange();
    const buttons: JSX.Element[] = [];

    pages.forEach((page, index) => {
      if (index > 0 && page - pages[index - 1] > 1) {
        buttons.push(
          <span
            key={`ellipsis-${index}`}
            className="paginationBtn bg-whiteGray text-main "
          >
            ...
          </span>,
        );
      }
      buttons.push(
        <button
          key={page}
          onClick={() => onPageClick(page)}
          className={`paginationBtn ${
            currentPage === page
              ? "bg-main text-white"
              : "bg-whiteGray text-main"
          }`}
        >
          {page}
        </button>,
      );
    });

    return buttons;
  };

  return (
    <div className="paddingX24 paddingY18 flex justify-between items-center bg-white rounded-lg hd:rounded-[0.55vw]">
      <div>
        <p className="custom-font12 font-medium text-emailText">
          {/* Showing {currentPage}-{limit ? limit : 10}{' '}
          {totalDocs && 'from ' + totalDocs} */}
          Showing {startRecord}-{endRecord} from {totalDocs}
        </p>
      </div>
      <div className="flex justify-between items-center space-x8">
        <button
          onClick={onPrev}
          disabled={currentPage === 1}
          className="paginationBtn bg-whiteGray text-main disabled:opacity-50"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <div className="flex space-x8">{renderPageButtons()}</div>
        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="paginationBtn bg-whiteGray text-main disabled:opacity-50"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default PaginationButtons;
