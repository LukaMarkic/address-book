import React from 'react'
import './../../styles/components/home/tablePaggingElement.scss'

const TablePaggingElement = ({currentPage, totalPages, handlePageChange }) => {
    const onPrevClick = () => {
        if (currentPage > 1) {
            handlePageChange(currentPage - 1);
        }
    };

    const onNextClick = () => {
        if (currentPage < totalPages) {
            handlePageChange(currentPage + 1);
        }
    };

  return (
    <div class="table-pagging-container">
        <div>
            {currentPage > 1 && <button id="prev-table-page" onClick={onPrevClick}>Prethodna</button>}
            {currentPage < totalPages && <button id="next-table-page" onClick={onNextClick}>Sljedeća</button>}
        </div>
        <p>Stranica: <span id="page-progress-text" >{(currentPage && totalPages) ? `${currentPage}/${totalPages}` : "-"}</span></p>
    </div>
  )
}

export default TablePaggingElement
