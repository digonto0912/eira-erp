import React from 'react';
import "./Pagination.css";

function Pagination() {
  return (
    <div className="pagination">
      <span>Rows Per Page:</span>
      <select>
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100" selected>100</option>
      </select>
      <span>1 to 100 of 289 total</span>
      <button className="pagination-btn">{"<"}</button>
      <button className="pagination-btn">1</button>
      <button className="pagination-btn">2</button>
      <button className="pagination-btn">3</button>
      <button className="pagination-btn">{">"}</button>
    </div>
  );
}

export default Pagination;
