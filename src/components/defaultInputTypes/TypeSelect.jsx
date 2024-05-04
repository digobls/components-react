import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../../assets/styles/defaultInputType.scss';
import DefaultLabel from './DefaultLabel';
import ErrorMessage from './ErrorMessage';
import {RiArrowDropDownLine, RiCloseLine} from '@remixicon/react';

const TypeSelect = ({
                        id = '',
                        label = '',
                        showLabel = true,
                        isRequired = false,
                        disable = false,
                        placeholder = '',
                        bindLabel = '',
                        bindValue = '',
                        listDrop = [],
                        loadingData = false,
                        searchSelect = true,
                        multiple = false,
                        placeHolderSearchSelect = 'Pesquisar',
                        txtSearchEmpty = 'Nenhum resultado encontrado',
                        invalidMsg = 'Campo obrigatório!',
                        register,
                        errors,
                        setValue,
                        watch
                    }) => {
    const [valueDropSelected, setValueDropSelected] = useState(multiple ? [] : null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [fromRemove, setFromRemove] = useState(false);
    const [valueSearchDrop, setValueSearchDrop] = useState('');
    const dropdownRef = useRef(null);
    const [filteredList, setFilteredList] = useState(listDrop);

    // Set and change data
    useEffect(() => {
        const dataValue = watch(id);
        if (dataValue) {
            if (multiple) {
                setValueDropSelected(dataValue);
            } else {
                const item = listDrop.find(item => ((item?.id && item?.id === dataValue?.id) || item?.id === dataValue || item === dataValue));
                setValueDropSelected(item);
            }
        } else {
            setValueDropSelected(multiple ? [] : null)
        }
    }, [watch, id, watch(id)]);

    // Close dropdown on click different area
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Filter on search
    useEffect(() => {
        const filtered = listDrop.filter((option) => {
            if (!searchSelect || !valueSearchDrop) {
                return true;
            }
            if (!bindLabel) {
                return option.toLowerCase().includes(valueSearchDrop.toLowerCase());
            } else {
                return option[bindLabel].toLowerCase().includes(valueSearchDrop.toLowerCase());
            }
        });
        setFilteredList(filtered);
    }, [listDrop, searchSelect, valueSearchDrop, bindLabel]);

    // Open dropdown
    const toggleDropdown = useCallback(() => {
        if (!disable && !fromRemove) {
            setDropdownOpen(prevOpen => !prevOpen);
        }
    }, [disable, fromRemove, dropdownOpen]);

    // Remove value selected
    const removeValueMultiple = useCallback((index) => {
        setFromRemove(true);
        setDropdownOpen(false);
        setValueDropSelected(prevValues => prevValues.filter((_, i) => i !== index));
        setTimeout(() => {
            setFromRemove(false);
        }, 300);
    }, []);

    // Remove all value
    const removeDropValue = useCallback(() => {
        if (!disable) {
            setValueDropSelected(multiple ? [] : null);
            setValue(id, multiple ? [] : null);
        }
    }, [disable, id, multiple, setValue]);

    // Checks if the value already exists
    const checkValueExists = useCallback((value) => {
        if (valueDropSelected?.length) {
            return valueDropSelected.some((item) => {
                return JSON.stringify(item) === JSON.stringify(value);
            });
        } else {
            return false;
        }
    }, [valueDropSelected, bindLabel]);

    // Select option value with params
    const selectOption = (value) => {
        if (value !== 'isEmptySearch') {
            if (multiple) {
                if (valueDropSelected === null || (multiple && typeof valueDropSelected === 'string')) {
                    setValueDropSelected([]);
                }

                const exists = checkValueExists(value);
                if (!exists) {
                    setValueDropSelected([...valueDropSelected, value]);
                    setValue(id, [...valueDropSelected, value]);
                }
            } else {
                setValueDropSelected(value);

                if (bindValue) {
                    setValue(id, value[bindValue]);
                } else {
                    setValue(id, value);
                }
            }

            setValueSearchDrop('');
            setDropdownOpen(false);
        }
    };

    return (
        <div className="default-input-type">
            {showLabel && (
                <DefaultLabel id={id} label={label} isRequired={isRequired}/>
            )}

            <input id={id} name={id} type="text"
                   disabled={disable} {...register(id, {required: isRequired ? invalidMsg : false})}
                   className="input-hidden"/>

            <div className="custom-dropdown" ref={dropdownRef}>
                <div className={`container-drop-view ${multiple ? 'container-drop-multiple-view' : ''}`}>
                    <button
                        type="button"
                        className="new-dropdown-toggle"
                        onClick={toggleDropdown}
                        disabled={disable}>

                        {!valueDropSelected || (!valueDropSelected?.length && multiple) ? (
                            <span className="content-placeholder">{placeholder}</span>
                        ) : !multiple ? (
                            <>
                                {bindLabel ? (
                                    <span className="content-value">{valueDropSelected[bindLabel]}</span>
                                ) : (
                                    <span className="content-value">{valueDropSelected}</span>
                                )}
                                <input id={`single${id}`} className="input-hidden"/>
                            </>
                        ) : (
                            valueDropSelected.map((data, index) => (
                                <div key={index} className="content-multiple-item">
                                    {!bindLabel ? (
                                        <span className="content-value">{data}</span>
                                    ) : (
                                        <span className="content-value">{data[bindLabel]}</span>
                                    )}
                                    {!disable && (
                                        <span onClick={() => removeValueMultiple(index)} className="icon-remove">
                                            <RiCloseLine size="14"/>
                                        </span>
                                    )}
                                    <input id={`multiple${id}`} className="input-hidden"/>
                                </div>
                            ))
                        )}
                        {(!valueDropSelected || (!valueDropSelected?.length && multiple)) && (
                            <span className="content-icon-drop">
                                <RiArrowDropDownLine size="20"></RiArrowDropDownLine>
                            </span>
                        )}
                        {loadingData && <span className="content-loading-data"></span>}
                    </button>

                    {((valueDropSelected && !multiple) || (valueDropSelected?.length >= 1 && multiple)) && (
                        <span onClick={removeDropValue} className="content-icon-remove">
                            <RiCloseLine size="14"/>
                        </span>
                    )}
                    {disable && <div className="disable-content"></div>}
                </div>

                {dropdownOpen && (
                    <ul id={`drop${id}`} className={`dropdown-menu ${dropdownOpen ? 'd-block' : ''}`}>
                        {searchSelect && (
                            <input
                                id="searchDrop"
                                className="input-search"
                                placeholder={placeHolderSearchSelect}
                                value={valueSearchDrop}
                                onChange={(e) => setValueSearchDrop(e.target.value)}
                            />
                        )}
                        {filteredList.map((option, index) => (
                            <li key={index} className="item" onClick={() => selectOption(option)}>
                                {!bindLabel ? (
                                    <span>{option}</span>
                                ) : (
                                    <span>{option[bindLabel]}</span>
                                )}
                            </li>
                        ))}
                        {listDrop.includes('isEmptySearch') && (
                            <li>
                                <span>{txtSearchEmpty}</span>
                            </li>
                        )}
                    </ul>
                )}
            </div>

            <ErrorMessage id={id} errors={errors}/>
        </div>
    );
};

export default TypeSelect;
