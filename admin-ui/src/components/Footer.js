import React from "react";

const Footer = ({
  selected,
  deleteSelectedUser,
  totalPages,
  pageClicked,
  firstPage,
  lastPage,
  currentPage,
  previousPage,
  nextPage,
  searchText,
}) => {
  return (
    <div className="d-flex justify-content-between footer">
      {searchText === "" ? (
        <>
          {selected.length > 0 ? (
            <button
              className="btn btn-outline-danger"
              onClick={deleteSelectedUser}
            >
              Delete Selected
            </button>
          ) : (
            <div></div>
          )}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              {parseInt(currentPage) !== totalPages[0] && (
                <li className="page-item page-link" onClick={firstPage}>
                  «
                </li>
              )}
              <li
                className={`page-link ${
                  parseInt(currentPage) === totalPages[0] && "disabled"
                }`}
                onClick={previousPage}
              >
                ‹
              </li>
              {totalPages.map((pageNumber, index) => {
                return (
                  <li
                    key={index}
                    className={`page-link ${
                      pageNumber === parseInt(currentPage)
                        ? "highlight active"
                        : ""
                    }`}
                    id={pageNumber}
                    onClick={(e) => pageClicked(e)}
                  >
                    {pageNumber}
                  </li>
                );
              })}
              <li
                className={`page-link ${
                  parseInt(currentPage) === totalPages.length && "disabled"
                }`}
                onClick={nextPage}
              >
                ›
              </li>
              {parseInt(currentPage) !== totalPages.length && (
                <li className="page-link" onClick={lastPage}>
                  »
                </li>
              )}
            </ul>
          </nav>{" "}
        </>
      ) : (
        <button className="btn btn-outline-danger" onClick={deleteSelectedUser}>
          Delete Selected
        </button>
      )}
    </div>
  );
};
export default Footer;
