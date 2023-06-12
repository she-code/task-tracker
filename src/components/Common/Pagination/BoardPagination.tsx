type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  count: number;
  offset: number;
  limit: number;
};

export default function BoardPagination(props: PaginationProps) {
  const { currentPage, totalPages, onPageChange, count, offset, limit } = props;

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPaginationNavs = (): JSX.Element[] => {
    const navs: JSX.Element[] = [];
    for (let i = 1; i < totalPages + 1; i++) {
      navs.push(
        <button
          key={i}
          aria-label={`Goto page ${i}`}
          tabIndex={0}
          className={`${
            i === currentPage
              ? "bg-customPurple text-white"
              : "text-white bg-glass"
          } relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:outline-none 
          focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          onClick={() => handlePageClick(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlePageClick(i);
            }
          }}
        >
          {i}
        </button>
      );
    }
    return navs;
  };

  return (
    <div className="flex items-center justify-between  px-4 py-3 sm:px-6  mb-8">
      <div className="flex flex-1 justify-between sm:hidden">
        {currentPage > 1 && (
          <button
            tabIndex={0}
            aria-label="Previous"
            className="relative inline-flex items-center px-2 py-2 mt-2 text-gray-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            onClick={() => handlePageClick(currentPage - 1)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePageClick(currentPage - 1);
              }
            }}
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            tabIndex={0}
            aria-label="Next"
            className="relative inline-flex items-center mt-2 px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
            onClick={() => handlePageClick(currentPage + 1)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlePageClick(currentPage + 1);
              }
            }}
          >
            Next
          </button>
        )}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div className="bg-glass p-3 rounded-md">
          <p className="text-sm text-white">
            showing <span className="font-medium">{offset + 1}</span> to{" "}
            <span className="font-medium">
              {limit > count
                ? count
                : count - offset < offset
                ? count
                : offset + limit}
            </span>{" "}
            of <span className="font-medium">{count} </span>
            results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {currentPage > 1 && (
              <button
                className="relative inline-flex items-center px-2 py-2 mt-2 text-gray-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => handlePageClick(currentPage - 1)}
              >
                <span className="sr-only">Previous</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </button>
            )}
            <div className="flex mt-2">{renderPaginationNavs()}</div>
            {currentPage < totalPages && (
              <button
                className="relative inline-flex items-center mt-2 px-2 py-2 text-gray-400 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                <span className="sr-only">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
