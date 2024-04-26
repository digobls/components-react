import React from 'react';
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

    // Get mask by type or set custom
    function getMask(type) {
        switch (type) {
            case 'cpf':
                return ['999.999.999-99'];
            case 'cnpj':
                return ['99.999.999.999-99'];
            case 'document':
                return ['999.999.999-99', '99.999.999.999-99']
            case 'phone':
                return ['(99) 9999-9999', '(99) 99999-9999'];
            case 'currency':
                return [
                    'R$ 9',
                    'R$ 99',
                    'R$ 9,99',
                    'R$ 99,99',
                    'R$ 999,99',
                    'R$ 9.999,99',
                    'R$ 99.999,99',
                    'R$ 999.999,99',
                    'R$ 9.999.999,99'];
            case 'date':
                return ['99/99/9999'];
            case 'custom':
                return mask
            default:
                return null;
        }
    }

    return (
        <div className="default-input-type">
            <label htmlFor={id} className="default-label-input">
                {label}
                {isRequired && (<span className="required-alert">*</span>)}
            </label>

            {mask ? (
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    readOnly={disable}
                    required={isRequired}
                    {...registerWithMask(id,
                        getMask(mask),
                        {
                            required: isRequired ? invalidMsg : false,
                            validate: checkExtraValidations
                        })
                    }
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
