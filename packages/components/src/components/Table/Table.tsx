import React from 'react'
import { useTable } from 'react-table'
import { Data, TableProperties, GeneratedColumn } from './interfaces'

interface Props {
  /** TableProperties are composed by a tableClassname string property and the columns array */
  tableProperties: TableProperties
  /** Provides data for the table */
  data?: Data[]
}



  //const columns = React.useMemo(() => generateColumns(tableProperties.columns), [])


function Table({ data, tableProperties }: Props) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = useTable;
  return (
    <>
      <table {...getTableProps()} className={tableProperties.tableClassname}>
        <thead>
          {headerGroups.map((headerGroup:any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: GeneratedColumn) => (
                <th
                  {...column.getHeaderProps()}
                  className={column.headerClassName ? column.headerClassName : ''}
                >
                  {/* <div {...(column.disableSorting ? null : column.getSortByToggleProps())}>
                    {column.render('Header')}              ------------------ Does not exist in generated columns
                    <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>   
                  </div> */}

                  <div>{!column.disableFiltering && column.render('Filter')}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: any) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => (
                  <td
                    {...cell.getCellProps()}
                    className={cell.column.className ? cell.column.className : ''}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          type="button"
          id="firstPageButton"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>
        <button
          type="button"
          id="previousPageButton"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>
        <button
          type="button"
          id="nextPageButton"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>
        <button
          type="button"
          id="lastPageButton"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>
        <span>
          Page
          <strong>
            {data && data.length ? pageIndex + 1 : pageIndex} of {pageOptions.length}
          </strong>
        </span>
        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const p = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(p)
            }}
            style={{ width: '100px' }}
          />
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageS) => (
            <option key={pageS} value={pageS}>
              Show {pageS}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export { Table }
