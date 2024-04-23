import React, {useEffect, useState} from 'react';
import {phoneMask, documentMask, readJson, readArray} from './Pipes';
import {Link} from 'react-router-dom';
import {
    RiArrowDownSFill,
    RiExpandUpDownLine,
    RiArrowUpSFill,
    RiEyeLine,
    RiEdit2Line,
    RiDeleteBin2Line,
    RiMoreFill,
    RiTableLine,
    RiArrowDownSLine,
    RiArrowLeftDoubleLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiArrowRightDoubleFill,
    RiFilePdf2Line
} from '@remixicon/react';
import '../../assets/styles/defaultSimpleTable.scss';

const ExecuteActionTemplate = ({action}) => (
    <>
        {action.type === 'view' && !action.icon && (
            <RiEyeLine size="14"/>
        )}
        {action.type === 'edit' && !action.icon && (
            <RiEdit2Line size="14"/>
        )}
        {action.type === 'delete' && !action.icon && (
            <>
                <RiDeleteBin2Line size="14"/>
            </>
        )}
        {action.icon && (
            <>
                {action.icon === 'ri-file-pdf-2-line' && (
                    <RiFilePdf2Line size="14"/>
                )}
            </>
        )}
        {action.label && <span>{action.label}</span>}
    </>
);

// Create link path and queryParams
const createLink = (data, dataRow) => {
    let dataLink = data.link;

    data?.pathname?.forEach((value) => {
        dataLink += `/${adjustStringUrl(dataRow[value])}`;
    });

    data?.params?.forEach((value, index) => {
        if (index) {
            dataLink += `&${value}=${adjustStringUrl(dataRow[value])}`;
        } else {
            dataLink += `?${value}=${adjustStringUrl(dataRow[value])}`;
        }
    });

    return dataLink || null;
}

// Adjust string to url
const adjustStringUrl = (data) => {
    try {
        if (data) {
            return encodeURIComponent(data.toString().trim().toLowerCase().replace(/\s+/g, ''));
        } else {
            return '';
        }
    } catch (e) {
        return '';
    }
}

const DefaultSimpleTable = ({
                                loading,
                                initialListHeader,
                                listData,
                                showDisplay,
                                initialConfigPagination,
                                paginationInfo,
                                maxSize = 5,
                                showChangeTotal,
                                onChangeListSort,
                                onDataAction,
                                onChangePagination
                            }) => {

    const [loadingData, setLoadingData] = useState(false);
    const [listHeader, setListHeader] = useState([]);
    const [configPagination, setConfigPagination] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [pagesToShow, setPagesToShow] = useState([]);
    const itemsPerPageOptions = [10, 20, 30, 40, 50, 60];

    // Start listHeader
    useEffect(() => {
        const updatedListHeader = initialListHeader?.map((v) => ({
            ...v,
            isVisible: true
        }));
        setListHeader(updatedListHeader);
    }, [initialListHeader]);
    useEffect(() => {
        setConfigPagination(initialConfigPagination);
    }, [initialListHeader]);
    useEffect(() => {
        setLoadingData(loading);
    }, [loading]);

    // Change item view on screen
    const handleCheckboxChange = (index) => {
        const updatedListHeader = listHeader.map((item, idx) => {
            return idx === index ? {...item, isVisible: !item.isVisible} : item;
        });

        setListHeader(updatedListHeader);
    };

    // Sort item from header
    const executeSort = (key, sortable) => {
        if (sortable) {
            const updatedListHeader = listHeader.map((item) => {
                if (item.key === key && item.sortable) {
                    if (item.sortOrder === 'asc') {
                        item.sortOrder = 'desc';
                    } else {
                        item.sortOrder = 'asc';
                    }

                    onChangeListSort({order: item.sortOrder, key: key});
                } else {
                    item.sortOrder = null;
                }

                return item;
            });

            setListHeader(updatedListHeader);
        }
    };

    // Send action click
    const executeAction = (action, row, i) => {
        onDataAction({action, row, index: i})
    }

    // Start pagination
    useEffect(() => {
        calculateTotalPages();
    }, [configPagination.totalRecords, configPagination.totalRecordsPerPage, configPagination.currentPage]);
    useEffect(() => {
        calculatePagesToShow();
    }, [totalPages]);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            if (configPagination.currentPage !== page) {
                configPagination.currentPage = page;
                calculatePagesToShow();
                setConfigPagination(configPagination);
                onChangePagination(configPagination);
            }
        }
    }

    const nextPage = () => {
        if (configPagination.currentPage < totalPages) {
            configPagination.currentPage++;
            calculatePagesToShow();
            onChangePagination(configPagination);
        }
    }

    const previousPage = () => {
        if (configPagination.currentPage > 1) {
            configPagination.currentPage--;
            calculatePagesToShow();
            onChangePagination(configPagination);
        }
    }

    const calculateTotalPages = () => {
        const totalPagesValue = Math.ceil(configPagination.totalRecords / configPagination.totalRecordsPerPage);
        setTotalPages(totalPagesValue);
    };

    const calculatePagesToShow = () => {
        const maxSizeShow = maxSize;
        const currentPage = configPagination.currentPage;
        const totalPagesShow = totalPages;
        let startPage = Math.max(1, currentPage - Math.floor(maxSizeShow / 2));
        let endPage = Math.min(totalPagesShow, startPage + maxSizeShow - 1);

        if (endPage - startPage + 1 < maxSizeShow) {
            startPage = Math.max(1, endPage - maxSizeShow + 1);
        }

        const arrayPages = Array.from({length: (endPage + 1) - startPage}, (_, i) => startPage + i)
        setPagesToShow(arrayPages);
    };

    const onChangeItemsPerPage = (value) => {
        configPagination.currentPage = 1;
        configPagination.totalRecordsPerPage = value;
        calculateTotalPages();
        calculatePagesToShow();
        onChangePagination(configPagination);
    }

    return (
        <>
            {!loadingData && (
                <div className="container-default-simple-table offset-top-20">
                    {(showDisplay || paginationInfo) && (
                        <div className="container-additional-table-info">
                            {/* Displays */}
                            {showDisplay && (
                                <div className="container-actions">
                                    <div className="container-box displays">
                                        <p>
                                            <RiTableLine size="15"/>
                                            <RiArrowDownSFill size="16"/>
                                        </p>
                                        <div className="container-list-items">
                                            {listHeader.map((data, i) => (
                                                <div key={i} className="custom-checkbox">
                                                    <input
                                                        id={i}
                                                        type="checkbox"
                                                        className="input-checkbox"
                                                        checked={data.isVisible}
                                                        onChange={() => handleCheckboxChange(i)}
                                                    />
                                                    <label htmlFor={i} className="label-checkbox">{data.label}</label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Pagination info */}
                            {(paginationInfo && configPagination?.currentPage && totalPages && configPagination.totalRecordsPerPage && configPagination?.totalRecords) && (
                                <p className="info-pagination">
                                    Página {configPagination.currentPage}/{totalPages} -
                                    Exibindo {configPagination.totalRecordsPerPage} de {configPagination.totalRecords} registros.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="table table-responsive default-simple-table">
                        <table className="table">
                            <thead>
                            <tr>
                                {listHeader.map((header) => (
                                    header?.isVisible && (
                                        <th key={header?.key}
                                            onClick={() => header.sortable && executeSort(header.key, header.sortable)}
                                            className={`${header?.sortable ? 'pointer ' : ''} ${header?.key === 'actions' ? 'on-action ' : ''}`}>
                                            {header?.label}
                                            {header.sortable && (
                                                <span className="content-sort">
                                                {header.sortOrder !== 'asc' && header.sortOrder !== 'desc' && (
                                                    <RiExpandUpDownLine size="14"/>)}
                                                    {header.sortOrder === 'asc' && (<RiArrowUpSFill size="14"/>)}
                                                    {header.sortOrder === 'desc' && (<RiArrowDownSLine size="14"/>)}
                                            </span>
                                            )}
                                        </th>
                                    )))}
                            </tr>
                            </thead>
                            <tbody>
                            {listData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {listHeader.map((header, colIndex) => (
                                        header.isVisible && (
                                            <td key={header.key} className={header.key === 'actions' ? 'on-action' : ''}>
                                                {header.key !== 'actions' && !header.usePipe && (
                                                    <p>{row[header.key] ? row[header.key] : '-'}</p>
                                                )}

                                                {header.key !== 'actions' && header.usePipe && (
                                                    <>
                                                        {header.isJson && (
                                                            <p>{readJson(row[header.key], header.jsonKey)}</p>
                                                        )}
                                                        {header.isArray && (
                                                            <p>{readArray(row[header.key])}</p>
                                                        )}
                                                        {header.isDate && (
                                                            <p>{new Date(row[header.key]).toLocaleDateString('pt-BR')}</p>
                                                        )}
                                                        {header.isCurrency && (
                                                            <p>{new Intl.NumberFormat('pt-BR', {
                                                                style: 'currency',
                                                                currency: 'BRL'
                                                            }).format(row[header.key])}</p>
                                                        )}
                                                        {header.isPhone && (
                                                            <p>{phoneMask(row[header.key])}</p>
                                                        )}

                                                        {header.isDocument && (
                                                            <p>{documentMask(row[header.key])}</p>
                                                        )}
                                                    </>
                                                )}

                                                {header.key === 'actions' && (
                                                    <div className="show-more-action">
                                                        <button id={`showAction${colIndex}`} type="button">
                                                            <RiMoreFill size="18"/>
                                                        </button>

                                                        <div className="dropdown-menu">
                                                            {header.actions.map((action, index) => (
                                                                <React.Fragment key={index}>
                                                                    {/* TODO:: Target */}
                                                                    {action.link && !action?.demo && (
                                                                        <Link
                                                                            to={action?.pathname ? createLink(action, row) : action.link}>
                                                                            <ExecuteActionTemplate action={action}/>
                                                                        </Link>
                                                                    )}

                                                                    {action.externalLink && !action?.demo && (
                                                                        <a href={action.externalLink}
                                                                           target={action.target ? action.target : '_self'}>
                                                                            <ExecuteActionTemplate action={action}/>
                                                                        </a>
                                                                    )}

                                                                    {((!action.link && !action.externalLink) || action?.demo )&& (
                                                                        <a onClick={() => executeAction(action, row, index)}>
                                                                            <ExecuteActionTemplate action={action}/>
                                                                        </a>
                                                                    )}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </td>
                                        )
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    {pagesToShow?.length > 1 && (
                        <div className="container-pagination-total-per-page">
                            <div className="container-pagination">
                                <button
                                    className="pagination-button"
                                    onClick={() => goToPage(1)}
                                    disabled={configPagination?.currentPage === 1}>
                                    <RiArrowLeftDoubleLine size="14"/>
                                </button>

                                <button
                                    className="pagination-button"
                                    onClick={() => previousPage()}
                                    disabled={configPagination?.currentPage === 1}>
                                    <RiArrowLeftSLine size="14"/>
                                </button>

                                {pagesToShow?.map((page, i) => (
                                    <button
                                        key={i}
                                        onClick={() => goToPage(page)}
                                        className={`pagination-button ${configPagination.currentPage === page ? 'active' : ''}`}>
                                        {page}
                                    </button>
                                ))}

                                <button
                                    className="pagination-button"
                                    onClick={() => nextPage()}
                                    disabled={configPagination?.currentPage === totalPages}>
                                    <RiArrowRightSLine size="14"/>
                                </button>

                                <button
                                    className="pagination-button"
                                    onClick={() => goToPage(totalPages)}
                                    disabled={configPagination?.currentPage === totalPages}>
                                    <RiArrowRightDoubleFill size="14"/>
                                </button>
                            </div>

                            {showChangeTotal && (
                                <div className="items-per-page-container">
                                    <label className="total-page-info">Itens por página:</label>
                                    <div className="container-total">
                                        <span>{configPagination?.totalRecordsPerPage}</span>

                                        <div className="container-values">
                                            {itemsPerPageOptions?.map((value, i) => (
                                                <div
                                                    key={i}
                                                    onClick={() => onChangeItemsPerPage(value)}
                                                    className="list-total">
                                                    {(value !== configPagination.totalRecordsPerPage && configPagination.totalRecords >= value) && (
                                                        <span>{value}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {loadingData && (
                <div>Config your loading layout</div>
            )}
        </>
    )
}

export default DefaultSimpleTable;