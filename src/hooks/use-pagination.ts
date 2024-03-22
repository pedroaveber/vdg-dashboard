import { useState } from 'react'

export const usePagination = <T>(items: T[], itemsPerPage = 10) => {
  const itemsAmount = items.length
  const pagesAmount = Math.ceil(itemsAmount / itemsPerPage) || 1

  const [currentPage, setCurrentPage] = useState(1)

  function nextPage() {
    setCurrentPage((prev) => prev + 1)
  }

  function prevPage() {
    setCurrentPage((prev) => prev - 1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToLastPage() {
    setCurrentPage(pagesAmount)
  }

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  return {
    itemsPerPage,
    currentItems,
    currentPage,
    pagesAmount,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  }
}
