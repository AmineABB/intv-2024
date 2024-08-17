'use client';

import { QUERY_PARAMS } from '@/constants/common';
import { useQueryParams } from '@/hooks/useQueryParams';
import classes from './pagination.module.css';

type PaginationProps = {
  totalPages: number;
};

type PageButtonsProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type Pages = (number | '...')[]

const DEFAULT_PAGES_TO_SHOW = 6;

const PageButtons = ({ currentPage, totalPages, onPageChange }: PageButtonsProps) => {
  const generatePageNumbers = (): Pages => {
    if (totalPages <= DEFAULT_PAGES_TO_SHOW) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const addPageRange = (pages: Pages, start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    };

    const pages: Pages = [];
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pages.push(1);

    if (startPage > 2) {
      pages.push('...');
    }

    addPageRange(pages, startPage, endPage);

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <>
    {pages.map((page, index) => {
      const isValidPage = typeof page === 'number';
      return (
        <button
          key={index}
          onClick={() => isValidPage && onPageChange(page)}
          className={`${classes.pagination_item} ${currentPage === page ? classes.pagination_item__active : ''}`}
          disabled={!isValidPage}>
          {page}
        </button>
      )
    })}
    </>
  )
};

export const Pagination = ({ totalPages }: PaginationProps) => {
  const { getQueryParam, setQueryParam } = useQueryParams();
  const currentPage = parseInt(getQueryParam(QUERY_PARAMS.PAGE)) || 1;
  const hasPreviousButton = currentPage > 1;
  const hasNextButton = currentPage < totalPages;

  const handlePageChange = (newPage: number) => {
    setQueryParam({ key: QUERY_PARAMS.PAGE, value: newPage.toString() });
  };

  return (
    <div className={classes.pagination_wrapper}>
      {hasPreviousButton && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={classes.prev_button}
          aria-label="Previous page">
          Previous
        </button>
      )}

      <PageButtons
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {hasNextButton && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={classes.next_button}
          aria-label="Next page">
          Next
        </button>
      )}
    </div>
  );
};