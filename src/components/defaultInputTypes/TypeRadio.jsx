import React, {useCallback, useEffect, useState} from 'react';
import ErrorMessage from './ErrorMessage';
import DefaultLabel from './DefaultLabel';

const TypeRadio = ({
                       id = '',
                       label = '',
                       radioItems = [],
                       bindValueRadio = '',
                       displayInline = false,
                       disable = false,
                       invalidMsg = 'Campo obrigatório!',
                       isRequired = true,
                       register,
                       errors,
                       setValue,
                       watch
                   }) => {
    const [radioValue, setRadioValue] = useState('');

    useEffect(() => {
        const dataValue = watch(id);
        if (dataValue) {
            setRadioValue((dataValue?.id || dataValue));
        } else {
            setRadioValue('')
        }
    }, [watch, id, watch(id)]);

    const handleChange = useCallback((data) => {
        const value = bindValueRadio ? data[bindValueRadio] : data;
        setValue(id, value, {
            shouldValidate: true
        });
    }, [bindValueRadio, setValue, id]);

    const handleData = () => {
    }

    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

            <div className="custom-radio">
                <div className={disable ? 'disabled' : ''}>
                    <input
                        id={id}
                        name={id}
                        type="text"
                        disabled={disable}
                        {...register(id, {
                            required: isRequired ? invalidMsg : false,
                        })}
                        className="input-hidden"/>
                    {radioItems.map((data) => (
                        <div key={data.id} className={`radio-item ${displayInline ? 'list-inline' : 'list-block'}`}>
                            <input
                                type="radio"
                                id={`${id}${data.id}`}
                                name={id}
                                value={data?.id ? data.id : data}
                                checked={radioValue === (data?.id ? data.id : data)}
                                disabled={disable}
                                onChange={(e) => handleData()}
                                onClick={() => handleChange(data)}
                            />
                            <label htmlFor={`${id}${data.id}`} className="custom-control-label">
                                {data.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <ErrorMessage id={id} errors={errors}/>
        </div>
    );
};

export default TypeRadio;