import React, {useCallback} from 'react';
import '../../assets/styles/defaultInputType.scss';
import {validateDocument} from './Validations';
import {useHookFormMask} from 'use-mask-input';
import DefaultLabel from './DefaultLabel';
import ErrorMessage from './ErrorMessage';

const TypeMask = ({
                      id = '',
                      label = '',
                      isRequired = false,
                      disable = false,
                      placeholder = '',
                      mask = '',
                      invalidMsg = 'Campo obrigatório!',
                      register,
                      errors,
                      customValidator
                  }) => {
    const registerWithMask = useHookFormMask(register);
    const checkExtraValidations = useCallback((value) => {
        if (customValidator) {
            const listKeys = Object.keys(customValidator);
            for (let i = 0; i < listKeys.length; i++) {
                const key = listKeys[i];
                switch (key) {
                    case 'document':
                        if (validateDocument(value)) return 'Documento inválido!';
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

    // Get mask by type or set custom
    function getMask(type) {
        const maskMap = {
            'cpf': ['999.999.999-99'],
            'cnpj': ['99.999.999.999-99'],
            'document': ['999.999.999-99', '99.999.999.999-99'],
            'phone': ['(99) 9999-9999', '(99) 99999-9999'],
            'currency': [
                'R$ 9',
                'R$ 99',
                'R$ 9,99',
                'R$ 99,99',
                'R$ 999,99',
                'R$ 9.999,99',
                'R$ 99.999,99',
                'R$ 999.999,99',
                'R$ 9.999.999,99'
            ],
            'date': ['99/99/9999'],
            'custom': [mask]
        };
        return maskMap[type] || null;
    }

    return (
        <div className="default-input-type">
            <DefaultLabel id={id} label={label} isRequired={isRequired}/>

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

            <ErrorMessage id={id} errors={errors}/>
        </div>
    );
};

export default TypeMask;
