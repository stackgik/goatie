'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Input } from '@/components/ui/input';
import DialogBox from './DialogBox';
import ExportData from '@/components/ExportData';
import { goats } from './mockGoats';
import { tableColumns } from '@/app/constants';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filename: string;
  btnContent: string;
  dialogBoxContent: ReactNode;
  filterPlaceholder: string;
  filterColumn: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filename,
  btnContent,
  dialogBoxContent,
  filterPlaceholder,
  filterColumn,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const pageNumber = table.getState().pagination.pageIndex + 1;
  const pageCount = table.getPageCount();

  return (
    <>
      {/* The table features */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center py-4'>
          <Input
            placeholder={filterPlaceholder}
            value={
              (table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''
            }
            onChange={event =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className='max-w-sm border border-gray-200 outline-0 shadow-none p-6 text-[16px]'
          />
        </div>

        <div className='flex items-center justify-end py-4 '>
          <ExportData data={goats} columns={tableColumns} filename={filename} />
          <DialogBox
            trigger={
              <Button className='bg-blue-600 capitalize text-[16px] font-bold text-white ml-6 py-6 cursor-pointer'>
                <Plus size={20} />
                {btnContent}
              </Button>
            }>
            {dialogBoxContent}
          </DialogBox>
        </div>
      </div>

      {/* The table */}
      <div>
        <div>
          <Table className='w-full table-fixed'>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow
                  key={headerGroup.id}
                  className='border-b border-gray-100 text-gray-400 font-bold'>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    className='border-b border-gray-100 hover:bg-gray-50 transition-all duration-300 ease-in-out cursor-pointer'
                    data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination  */}
          {pageCount > 0 ? (
            <div className='flex items-center justify-between py-16 relative border-t border-gray-100'>
              <div className='flex w-max items-center justify-center text-sm font-medium'>
                Page {pageNumber} of {pageCount}
              </div>

              {/* controls */}
              <div className='flex items-center space-x-10 absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                <Button
                  variant='ghost'
                  className='cursor-pointer'
                  onClick={() => {
                    table.previousPage();
                  }}
                  disabled={!table.getCanPreviousPage()}>
                  <span className='sr-only'>Go to previous page</span>
                  <ChevronLeft /> Previous
                </Button>

                {/* the page numbers start*/}

                <div className='flex space-x-3 items-center'>
                  {Array.from({ length: pageCount }, (_, i) => (
                    // Each button relies on the pageIndex state that is managed internally by the Tanstack Table
                    // The pageIndex state is 0-based, so we need to add 1 to the index to get the correct page number
                    <Button
                      key={i + 1}
                      onClick={() => {
                        table.setPageIndex(i);
                      }}
                      className={`rounded-sm flex items-center justify-center text-[14px] border-none font-bold shadow-none px-2 py-1 cursor-pointer ${
                        pageNumber === i + 1 ? 'bg-blue-600 text-white' : ''
                      }`}>
                      {i + 1 <= 9 ? `0${i + 1}` : i + 1}
                    </Button>
                  ))}
                </div>
                {/* the page number end */}

                <Button
                  variant='ghost'
                  className='cursor-pointer'
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}>
                  <span className='sr-only'>Go to next page</span>
                  Next <ChevronRight />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
// Wrap the component with React.memo to prevent unnecessary re-renders
