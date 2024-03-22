'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '../FormComponents'

type PaginationProps = {
  itemsAmount: number
  pagesAmount: number
  itemsPerPage: number
  currentPage: number
  nextPage: () => void
  prevPage: () => void
  goToFirstPage: () => void
  goToLastPage: () => void
}

export function Pagination(props: PaginationProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <span>Total de {props.itemsAmount} items</span>

      {props.pagesAmount > 1 && (
        <div className="flex items-center gap-4">
          <span>
            Página {props.currentPage} de {props.pagesAmount}
          </span>

          <nav className="flex items-center gap-3">
            <Button
              onClick={props.goToFirstPage}
              disabled={props.currentPage === 1}
              variant="outline"
              className="flex h-8 w-8 items-center justify-center rounded-md p-0"
            >
              <ChevronsLeft className="h-5 w-5" />
              <span className="sr-only">Primeira página</span>
            </Button>

            <Button
              onClick={props.prevPage}
              disabled={props.currentPage === 1}
              variant="outline"
              className="flex h-8 w-8 items-center justify-center rounded-md p-0"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Página anterior</span>
            </Button>

            <Button
              onClick={props.nextPage}
              disabled={props.currentPage === props.pagesAmount}
              variant="outline"
              className="flex h-8 w-8 items-center justify-center rounded-md p-0"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Próxima página</span>
            </Button>

            <Button
              onClick={props.goToLastPage}
              disabled={props.currentPage === props.pagesAmount}
              variant="outline"
              className="flex h-8 w-8 items-center justify-center rounded-md p-0"
            >
              <ChevronsRight className="h-5 w-5" />
              <span className="sr-only">Útilma página</span>
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}
