import React, { useMemo, useState, useEffect } from 'react'
//import할 때 useGlobalFilter 훅을 넣음
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy, useRowSelect } from 'react-table'
import { useNavigate } from 'react-router-dom'
import { COLUMNS } from './columns'
import './PatientTable.css'
import iconSortUp from '../image/iconSortUp.svg'
import iconSortDown from '../image/iconSortDown.svg'
import { CheckBox } from './CheckBox'
import axios from 'axios';
import ColumnFilter from './Columnfilter.jsx'

const PatientTable = ({ modal, selectedColumn, searchTerm, setting, setModal, setPid, pid, commentArr, classifyComment, patAxios, setPatAxios }) => {

    const columns = useMemo(() => {
        return COLUMNS.map((column) => {
            return {
                ...column,
                Filter: ({ column }) => <ColumnFilter column={column} selectedColumn={selectedColumn} searchTerm={searchTerm} />,
                // 나머지 컬럼 설정
            };
        });
    }, [selectedColumn, searchTerm]);
    const [datas, setDatas] = useState([]);
    const data = useMemo(() => datas, [datas]);

    //status modal useState
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //선택한 셀의 정보를 저장할 상태 추가
    const [selectedCell, setSelectedCell] = useState(null);

    //status modal input
    const [inputValue, setInputValue] = useState("");

    //stattus modal 
    const openModal = (cell) => {
        setSelectedCell(cell)
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    // 데이터를 변경하는 함수
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    // 데이터 저장 함수
    const handleSave = async () => {
        // 데이터를 변경합니다.
        selectedCell.row.original[selectedCell.column.id] = inputValue;

        // 변경된 데이터를 서버에 전송합니다.
        await axios.post('http://localhost:3001/status/update', {
            ...selectedCell.row.original,  // 변경된 데이터를 포함한 행의 데이터
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error);
        });

        closeModal();
    };




    const commentSvg = <svg width='1rem' clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.75c0-.414.336-.75.75-.75s.75.336.75.75v9.25c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm-2.011 6.526c-1.045 3.003-1.238 3.45-1.238 3.84 0 .441.385.626.627.626.272 0 1.108-.301 3.829-1.249zm.888-.889 3.22 3.22 8.408-8.4c.163-.163.245-.377.245-.592 0-.213-.082-.427-.245-.591-.58-.578-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245z" fill-rule="nonzero" /></svg>

    const nav = useNavigate();

    const loadPatient = async () => {
        await axios.post('http://localhost:3001/patients', {
        })
            .then((res) => {
                setDatas(res.data);
                setting(res.data.length)
            })
            .catch((error) => {
            });
    }
    useEffect(() => {
        loadPatient();
    }, []);

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
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0, pageSize: 15 }
    }, useFilters,
        useGlobalFilter,
        //Sort는 filter보다 뒤에 와야 작동함. 위치 변동 하지 말 것.
        useSortBy,
        usePagination,
        useRowSelect,
        // Checkbox
        // (hooks) => {
        //     hooks.visibleColumns.push((columns) => [
        //         {
        //             id: 'selection',
        //             Header: ({ getToggleAllRowsSelectedProps }) => <CheckBox {...getToggleAllRowsSelectedProps()} />,
        //             Cell: ({ row }) => <CheckBox {...row.getToggleRowSelectedProps()} />,
        //         },
        //         ...columns,
        //     ]);
        // }
    );

    // pagination
    const { pageIndex } = state;

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

    useEffect(() => {
        loadPatient()
        setPatAxios(false)
    }, [patAxios])

    return (
        <div>

            <table className='p-tb' {...getTableProps()}>
                <thead className='p-tb-thead'>
                    {headerGroups.map((headerGroup, headerIndex) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((columns, columnsIndex) => (
                                <th className='p-tb-column' {...columns.getHeaderProps(columns.getSortByToggleProps())}>{columns.render('Header')}

                                    {/* sort 버튼*/}
                                    {
                                        headerIndex === 1 && columnsIndex !== 0 ?
                                            (columns.isSortedDesc ? <img src={iconSortDown} /> : <img src={iconSortUp} />) : ''}
                                    {/* 열 필터 컴포넌트를 추가합니다. */}
                                    {columns.Filter ? <div>{columns.render('Filter')}</div> : null}
                                </th>

                            ))}
                            <th className='p-tb-column'>Comment

                            </th>
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {/* page를 나타낼 거면 rows를 page로 바꾼다. */}
                    {page.map((row, idx) => {
                        prepareRow(row)
                        return (
                            <tr style={{ cursor: 'pointer' }} {...row.getRowProps()} onDoubleClick={() => {
                                nav(`/detailpage?pid=${row.original.patient_id}`)
                            }}>
                                {row.cells.map((cell, columnIndex) => {
                                    let buttonTextColor = 'grey'
                                    if (columnIndex === 0) {
                                        switch (cell.row.original[cell.column.id]) {
                                            case 0:
                                                buttonTextColor = 'green';
                                                break;
                                            case 1:
                                                buttonTextColor = 'yellow';
                                                break;
                                            case 2:
                                                buttonTextColor = 'red';
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {columnIndex === 0 ?
                                                <button style={{ cursor: 'pointer', padding: '4px', color: buttonTextColor, textAlign: 'center', backgroundColor: 'transparent', border: 'none', fontSize: 'x-large' }}
                                                    onClick={() => openModal(cell)}>
                                                    ●
                                                </button> :
                                                cell.render('Cell')}
                                        </td>
                                    )
                                })}
                                <td><button
                                    style={{ cursor: 'pointer', width: '100%' }}
                                    className='table-page-col'
                                    onClick={() => {
                                        setPid(row.original.patient_id)
                                        setModal(true)
                                    }}>{commentArr &&
                                        commentArr.includes(row.original.patient_id) ? 'O' : 'X'
                                    }</button></td>

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
                                    backgroundColor: pageIndex === index ? "#0d47a1" : "transparent",
                                    color: pageIndex === index ? "white" : 'black'
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
            {/* status modal창 */}
            {modalIsOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '1em', width: '20%', height: '25%' }}>
                        <button style={{ border: 'none', backgroundColor: 'transparent', float: 'right' }} onClick={closeModal}>✕</button>
                        <div>
                            <h2 style={{ width: '100%', height: '30%', display: 'flex', justifyContent: 'center' }}>Status Change</h2>
                            <form style={{ width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', flexDirection: 'column' }} onSubmit={(e) => e.preventDefault()}>
                                <div style={{ width: '40%', marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
                                    <input type="radio" id="option-0" name="option" value="0" onChange={handleChange} />
                                    <label style={{ color: "#4caf50" }} for="option-0" >stable</label>
                                </div>
                                <div style={{ width: '40%', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                    <input type="radio" id="option-1" name="option" value="1" onChange={handleChange} />
                                    <label style={{ color: "#ffc107" }} for="option-1" >screening</label>
                                </div>
                                <div style={{ width: '40%', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                                    <input type="radio" id="option-2" name="option" value="2" onChange={handleChange} />
                                    <label style={{ color: "#f44336" }} for="option-2" >emergency</label>
                                </div>
                                <button style={{ width: '5vw', height: '3vh', marginTop: '5%', padding: '1.5%', display: 'flex', justifyContent: 'center', border: 'none', color: '#ddd', backgroundColor: '#0d47a1' }} onClick={handleSave}>Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default PatientTable;