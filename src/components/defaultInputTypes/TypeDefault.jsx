import React, {useCallback} from 'react';
import '../../assets/styles/defaultInputType.scss';
import {validateEmail, validateDocument, validateFullName} from './Validations';
import DefaultLabel from './DefaultLabel';
import InputError from './InputError';

const TypeDefault = ({
                         type = 'text',
                         id = '',
                         label = '',
                         isRequired = false,
                         disable = false,
                         placeholder = '',
                         invalidMsg = 'Campo obrigatório!',
                         register,
                         errors,
                         customValidator
                     }) => {
    const checkExtraValidations = useCallback((value) => {
        if (customValidator) {
            const listKeys = Object.keys(customValidator);
            for (let i = 0; i < listKeys.length; i++) {
                const key = listKeys[i];
                switch (key) {
                    case 'email':
                        if (validateEmail(value)) return 'E-mail inválido!';
                        break;
                    case 'document':
                        if (validateDocument(value)) return 'Documento inválido!';
                        break;
                    case 'fullName':
                        if (validateFullName(value)) return 'Nome inválido!';
                        break;
                    case 'maxLength':
                        if (value?.length > customValidator[key]) return `O campo deve ter no máximo ${customValidator[key]} caracteres.`;
                        break;
                    case 'minLength':
                        if (value?.length < customValidator[key]) return `O campo deve ter no mínimo ${customValidator[key]} caracteres.`;
                        break;
                    default:
                        break;
                }
            }
        }
        return true;
    }, [customValidator]);

    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

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

            <InputError id={id} errors={errors}/>
        </div>
    );
};

export default TypeDefault;
