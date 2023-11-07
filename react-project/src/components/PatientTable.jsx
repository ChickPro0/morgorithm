import React, { useMemo, useState } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import FAKE_DATA from '../FAKE_DATA.json'
import { GROUPED_COLUMNS } from './columns'
import './PatientTable.css'
import { GlobalFilter } from './GlobalFilter'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'
import { CheckBox } from './CheckBox'


const PatientTable = () => {


    const columns = useMemo(() => GROUPED_COLUMNS, [])
    const data = useMemo(() => FAKE_DATA, [])

    // const defaultColumn = useMemo(() => {
    //     return {
    //         Filter: GlobalFilter
    //     }
    // }, [])

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        //현재 페이지의 데이터
        page,
        //다음 페이지로 이동하는 함수
        nextPage,
        //이전 페이지로 이동하는 함수
        previousPage,
        //다음 페이지로 이동 가능한지 여부
        canNextPage,
        //이전 페이지로 이동 가능한지 여부
        canPreviousPage,
        //총 페이지 수
        gotoPage,
        pageCount,
        //page 입력해서 바로가기 만들기
        prepareRow,
        // selectedFlatRows,
        //filter함수 props
        state,
        setGlobalFilter,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy,
        usePagination,
        useRowSelect,
        // Checkbox
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        },
                        Cell: ({ row }) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    );

    //파싱한 globalFilter값
    const { globalFilter } = state

    // row-selection
    // const firstPageRows = rows.slice(0, 10)

    // pagination
    const { pageIndex } = state;
    const [pageSize, setPageSize] = useState(10);

    const pageRange = 10;
    const startPage = Math.max(0, pageIndex - pageIndex % pageRange);
    const endPage = Math.min(pageCount, startPage + pageRange);

    const handleNextTenPages = () => {
        if (canNextPage) {
            gotoPage(Math.min(pageIndex + 10, pageCount - 1));
        }
    };

    const handlePreviousTenPages = () => {
        if (canPreviousPage) {
            gotoPage(Math.max(pageIndex - 10, 0));
        }
    };

    return (
        <div>

            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns, columnsIndex) => (
                                <th {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {
                                        headerIndex === 1 && columnsIndex !== 0 ?
                                            (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {/* page를 나타낼 거면 rows를 page로 바꾼다. */}
                    {page.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell, columnIndex) => {
                                    // console.log('row', row)
                                    // console.log('cell', row.cells)
                                    const cellClassName = columnIndex === 0 ? "row-checkbox" : "";
                                    return <td {...cell.getCellProps()} className={cellClassName}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div className='btn-page-container'>

                <button className='btn-page' onClick={handlePreviousTenPages} disabled={!canPreviousPage}>{'<<'}</button>
                <button className='btn-page' onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
                <span>

                    {Array(endPage - startPage)
                        .fill()
                        .map((_, index) => (
                            <button
                                className='btn-num-page'
                                key={startPage + index}
                                type="button"
                                style={{
                                    fontWeight: pageIndex === startPage ? "bold" : "normal",
                                }}
                                onClick={() => gotoPage(startPage + index)}
                            >
                                {startPage + index + 1}
                            </button>
                        ))}
                </span>
                <button className='btn-page' onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
                <button className='btn-page' onClick={handleNextTenPages} disabled={!canNextPage}>{'>>'}</button>
            </div>
        </div >
    )
}

export default PatientTable;