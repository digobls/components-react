import React, {useCallback} from 'react';
import '../../assets/styles/defaultInputType.scss';
import {validateEmail, validateDocument, validateFullName} from './Validations';
import {useHookFormMask} from 'use-mask-input';
import DefaultLabel from './DefaultLabel';
import InputError from './InputError';

const DefaultCheckbox = ({
                             type = 'text',
                             id = '',
                             label = '',
                             isRequired = false,
                             disable = false,
                             placeholder = '',
                             labelCheckbox,
                             labelLinkTarget,
                             labelLink,
                             subCheckboxLabel,
                             checkItems,
                             mask = '',
                             register,
                             errors,
                             invalidMsg = 'Campo obrigatório!',
                             customValidator
                         }) => {


    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

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

            {type === 'checkbox' && !checkItems && (
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
                    <label htmlFor={id} className={"label-checkbox"}>
                        {labelCheckbox}

                        {subCheckboxLabel && labelLink && (
                            <a target={labelLinkTarget} href={labelLink}>{subCheckboxLabel}</a>
                        )}
                    </label>
                </div>
            )}

            <InputError id={id} errors={errors}/>
        </div>
    );
};

export default DefaultCheckbox;
