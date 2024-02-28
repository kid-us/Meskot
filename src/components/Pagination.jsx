import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ data, onPagination, comingTo }) => {
  // GEt parameter
  const getParameter = (link) => {
    const url = new URL(link);
    const pageParam = url.searchParams.get("page");
    const page = `?page=${pageParam}`;
    if (pageParam === null) {
      return "";
    } else {
      return page;
    }
  };

  return (
    <div>
      {data ? (
        data.next !== null && data.previous !== null ? (
          ""
        ) : (
          <div className="col-12 text-end fw-semibold mt-4">
            {data.previous === null ? (
              <span className="me-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                Previous
              </span>
            ) : (
              <Link
                to={`/${comingTo}${getParameter(data.previous)}`}
                onClick={() => onPagination(data.previous)}
                className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
              >
                Previous
              </Link>
            )}

            {data.next === null ? (
              <span className="ms-4 text-uppercase bg-secondary px-3 small rounded py-2 text-white">
                Next
              </span>
            ) : (
              <Link
                to={`/${comingTo}${getParameter(data.next)}`}
                onClick={() => onPagination(data.next)}
                className="text-uppercase text-white buyers-bg px-3 small shadow rounded py-2"
              >
                Next
              </Link>
            )}
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
