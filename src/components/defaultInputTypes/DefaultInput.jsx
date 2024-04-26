import React, {useEffect} from 'react';
import '../../assets/styles/defaultInputType.scss';
import {validateEmail, validateDocument, validateFullName} from './Validations';
import {useHookFormMask} from 'use-mask-input';

const DefaultInput = ({
                          type = 'text',
                          id = '',
                          label = '',
                          disable = false,
                          placeholder = '',
                          mask = '',
                          isRequired = false,
                          register,
                          errors,
                          invalidMsg = 'Campo obrigatório!',
                          customValidator
                      }) => {
    const registerWithMask = useHookFormMask(register);
    // useEffect(() => {
    //     console.log('useEffect mask', mask)
    // }, [mask]);

    // Check extras validations
    const checkExtraValidations = (value) => {
        if (customValidator) {
            const listKeys = Object.keys(customValidator);
            let errorMessage = null;
            listKeys.forEach((key) => {
                if (!errorMessage) {
                    switch (key) {
                        case 'email':
                            errorMessage = validateEmail(value) ? 'E-mail inválido!' : '';
                            break;
                        case 'document':
                            errorMessage = validateDocument(value) ? 'Documento inválido!' : '';
                            break;
                        case 'fullName':
                            errorMessage = validateFullName(value) ? 'Nome inválido!' : '';
                            break;
                        case 'maxLength':
                            errorMessage = value?.length > customValidator[key] ? `O campo deve ter no máximo ${customValidator[key]} caracteres.` : '';
                            break;
                        case 'minLength':
                            errorMessage = value?.length < customValidator[key] ? `O campo deve ter no mínimo ${customValidator[key]} caracteres.` : '';
                            break;
                    }
                }
            });
            return errorMessage || true;
        }
        return null;
    };

    function getMask(type) {
        switch (type) {
            case 'cpf':
                return ['###.###.###-##'];
            case 'cnpj':
                return ['##.###.###.###-##'];
            case 'document':
                return ['###.###.###-##', '##.###.###.###-##']
            case 'phone':
                return ['(##) ####-####', '(##) #####-####'];
            case 'currency':
                return ['R$ {1}'];
            case 'date':
                return ['##/##/####'];
            default:
                return null;
        }
    }

    return (
        <div className="default-input-type">
            <label htmlFor={id} className="default-label-input">
                {label}
                <span className="required-alert">*</span>
            </label>

            {mask ? (
                <input
                    {...registerWithMask(id,
                        getMask(mask),
                        {required: isRequired ? invalidMsg : false, validate: checkExtraValidations})}
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    readOnly={disable}
                    required={isRequired}
                    className="custom-default-input"/>
            ) : (
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    readOnly={disable}
                    required={isRequired}
                    {...register(id, {
                        required: isRequired ? invalidMsg : false,
                        validate: checkExtraValidations
                    })}
                    className="custom-default-input"/>
            )}

            {errors && errors[id] && <span className="invalid-feedback">{errors[id].message}</span>}
        </div>
    );
};

export default DefaultInput;
