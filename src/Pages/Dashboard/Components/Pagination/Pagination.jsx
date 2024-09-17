import React from 'react';
import "./Pagination.css";

function Pagination() {
  return (
    <div className="pagination-root">
      <div className="pagination">
        <div>
          <span>Rows Per Page:</span>
          <select>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100" selected>100</option>
          </select>
        </div>
        <span>1 to 100 of 289 total</span>
        <div>
          <button className="pagination-btn">{"<"}</button>
          <button className="pagination-pages-btn-active">1</button>
          <button className="pagination-pages-btn">2</button>
          <button className="pagination-pages-btn">3</button>
          <button className="pagination-btn">{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
