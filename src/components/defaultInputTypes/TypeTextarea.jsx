import React from 'react';
import '../../assets/styles/defaultInputType.scss';
import DefaultLabel from './DefaultLabel';
import ErrorMessage from './ErrorMessage';

const TypeTextarea = ({
                          id = '',
                          label = '',
                          isRequired = false,
                          disable = false,
                          placeholder = '',
                          invalidMsg = 'Campo obrigatório!',
                          register,
                          errors
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

            <ErrorMessage id={id} errors={errors}/>
        </div>
    );
};

export default TypeTextarea;
