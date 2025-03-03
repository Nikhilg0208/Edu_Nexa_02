import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";
import { FaSort } from "react-icons/fa";

const Table = ({ columns, data, heading, showPagination = false }) => {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });

  return (
    <div className="p-4 bg-white rounded-lg overflow-x-auto">
      <h2 className="text-xl font-bold text-black mb-4">{heading}</h2>

      <table className="min-w-full table-auto border border-gray-200 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="relative px-4 py-3 text-left font-medium group cursor-pointer select-none min-w-0"
                  style={{ width: header.getSize() }}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 truncate">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </span>

                    {header.column.getCanSort() && (
                      <span className="ml-2 transition-opacity opacity-60 group-hover:opacity-100">
                        {header.column.getIsSorted() === "asc" ? (
                          <AiOutlineSortAscending className="text-gray-700" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <AiOutlineSortDescending className="text-gray-700" />
                        ) : (
                          <FaSort className="text-gray-500" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Resizable Handler */}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute top-0 right-0 h-full w-[4px] cursor-col-resize ${
                      header.column.getIsResizing()
                        ? "bg-green-500"
                        : "bg-transparent hover:bg-gray-400"
                    }`}
                  ></div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-gray-700 break-words whitespace-normal min-w-0"
                    style={{
                      wordBreak: "break-word",
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showPagination && (
        <div className="table-pagination flex items-center justify-center space-x-4 mt-4">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1.5 bg-black text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 hover:bg-gray-600 transition-colors"
          >
            {"<"}
          </button>
          <span className="text-sm text-gray-700">
            {`${
              table.getState().pagination.pageIndex + 1
            } of ${table.getPageCount()}`}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1.5 bg-black text-white rounded-lg disabled:bg-gray-300 disabled:text-gray-500 hover:bg-gray-600 transition-colors"
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
