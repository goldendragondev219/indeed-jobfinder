import React from "react";
import "./JobsPagination.scss";
import { Pagination } from "antd";

function JobsPagination({
  hidePerPageLimit,
  defaultPage,
  totalData,
  pageLimit,
  setPageNoState,
}) {
  const handlePageNumber = (pageNumber) => {
    setPageNoState(pageNumber);
  };

  return (
    <div className="jobs-pagination-wrapper ">
      <Pagination
        showSizeChanger={!hidePerPageLimit}
        defaultCurrent={defaultPage}
        pageSize={pageLimit || 10}
        total={totalData}
        onChange={handlePageNumber}
      />
    </div>
  );
}

export default JobsPagination;
