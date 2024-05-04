import React, {useEffect, useMemo, useState} from 'react';
import '../../assets/styles/defaultInputType.scss';
import DefaultLabel from './DefaultLabel';
import ErrorMessage from './ErrorMessage';

const TypeCheckbox = ({
                          type = 'text',
                          id = '',
                          label = '',
                          showLabel = true,
                          isRequired = false,
                          disable = false,
                          placeholder = '',
                          displayInline = false,
                          labelCheckbox = '',
                          labelLinkTarget = '',
                          labelLink = '',
                          subCheckboxLabel = '',
                          checkItems = [],
                          invalidMsg = 'Campo obrigatório!',
                          register,
                          errors,
                          watch,
                          setValue
                      }) => {
    const [listCheckbox, setListCheckbox] = useState(checkItems);

    useEffect(() => {
        const dataValue = watch(id);
        if (dataValue && dataValue.length) {
            const arrayIds = new Set(dataValue.map(item => item.id));
            const dataCheckItems = listCheckbox.map(item => ({...item, checked: arrayIds.has(item.id)}));
            setListCheckbox(dataCheckItems);
        }
    }, [watch, id, watch(id)]);

    const handleData = (value) => {
        const updatedListCheckboxes = listCheckbox.map(checkbox =>
            checkbox.id.toString() === value ? {...checkbox, checked: !checkbox.checked} : checkbox
        );
        const checkedItems = updatedListCheckboxes.filter(checkbox => checkbox.checked === true);
        setValue(id, checkedItems);
        setListCheckbox(updatedListCheckboxes);
    };

    const memoizedCheckboxes = useMemo(() => listCheckbox.map((item, index) => (
        <div key={item?.id || index} className="custom-checkbox">
            <input
                id={item?.id + index}
                disabled={disable}
                checked={item?.checked}
                value={item?.id || item}
                onChange={(e) => handleData(e.target.value)}
                type="checkbox"
                className="input-checkbox"
            />
            <label htmlFor={item?.id + index} aria-labelledby={item?.id + index}
                   className="label-checkbox">{item?.name}</label>
        </div>
    )), [listCheckbox, disable]);

    return (
        <div className="default-input-type">
            {showLabel && (
                <DefaultLabel id={id} label={label} isRequired={isRequired}/>
            )}

            {type === 'switch' && (
                <div className={"custom-switch"}>
                    <input
                        id={id}
                        type="checkbox"
                        placeholder={placeholder}
                        disabled={disable}
                        required={isRequired}
                        {...register(id, {
                            required: isRequired ? invalidMsg : false
                        })}
                        className="switch"/>
                </div>
            )}

            {type === 'checkbox' && (!checkItems || !checkItems?.length) && (
                <div className={'custom-checkbox checkbox-isolated'}>
                    <input
                        id={id}
                        type="checkbox"
                        disabled={disable}
                        required={isRequired}
                        {...register(id, {
                            required: isRequired ? invalidMsg : false
                        })}
                        className="input-checkbox"/>
                    <label htmlFor={id} aria-labelledby={id} className={"label-checkbox"}>
                        {labelCheckbox}
                        {subCheckboxLabel && labelLink && (
                            <a target={labelLinkTarget ? labelLinkTarget : '_self'}
                               href={labelLink}>{subCheckboxLabel}</a>
                        )}
                    </label>
                </div>
            )}

            {type === 'checkbox' && checkItems?.length >= 1 && (
                <div className={`${displayInline ? 'checkbox-container-inline' : 'checkbox-container-block'}`}>
                    <input
                        id={id}
                        name={id}
                        type="text"
                        disabled={disable}
                        {...register(id, {
                            required: isRequired ? invalidMsg : false,
                        })}
                        className="input-hidden"/>
                    {memoizedCheckboxes}
                </div>
            )}

            <ErrorMessage id={id} errors={errors}/>
        </div>
    );
};

export default TypeCheckbox;
