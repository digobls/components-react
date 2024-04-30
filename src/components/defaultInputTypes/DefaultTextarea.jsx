import React from 'react';
import '../../assets/styles/defaultInputType.scss';
import DefaultLabel from './DefaultLabel';
import InputError from './InputError';

const DefaultTextarea = ({
                             id = '',
                             label = '',
                             isRequired = false,
                             disable = false,
                             placeholder = '',
                             register,
                             errors,
                             invalidMsg = 'Campo obrigatório!'
                         }) => {

    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

            <textarea
                id={id}
                placeholder={placeholder}
                readOnly={disable}
                required={isRequired}
                {...register(id, {
                    required: isRequired ? invalidMsg : false,
                })}
                className="custom-default-textarea"/>

            <InputError id={id} errors={errors}/>
        </div>
    );
};

export default DefaultTextarea;
