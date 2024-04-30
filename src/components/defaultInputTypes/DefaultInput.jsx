import React from 'react';
import TypeMask from './TypeMask';
import TypeDefault from './TypeDefault';
import TypeSelect from './TypeSelect';
import TypeRadio from './TypeRadio';
import TypeCheckbox from './TypeCheckbox';
import TypeTextarea from './TypeTextarea';
import TypeTag from './TypeTag';

const DefaultInput = ({
                          // Global
                          type = '',
                          id = '',
                          label = '',
                          isRequired = false,
                          disable = false,
                          placeholder = '',
                          invalidMsg = '',
                          mask = '',
                          customValidator,

                          // Radio items
                          radioItems = [],
                          bindValueRadio = '',
                          displayInline = false,

                          // Tag items
                          showRemoveTag = true,

                          // Checkbox items
                          labelCheckbox = '',
                          labelLinkTarget = '',
                          labelLink = '',
                          subCheckboxLabel = '',
                          checkItems = [],

                          // Select items
                          bindLabel = '',
                          bindValue = '',
                          listDrop = [],
                          loadingData = false,
                          searchSelect = true,
                          multiple = false,
                          placeHolderSearchSelect = 'Pesquisar',
                          txtSearchEmpty = 'Nenhum resultado encontrado',

                          // useForm items
                          register,
                          errors,
                          setValue,
                          watch
                      }) => {
    return (
        <>
            {(type === 'text' || type === 'password' || type === 'date' || type === 'number') && (
                <>
                    {mask ? (
                        <TypeMask
                            id={id}
                            type={type}
                            label={label}
                            placeholder={placeholder}
                            mask={mask}
                            disable={disable}
                            isRequired={isRequired}
                            register={register}
                            errors={errors}>
                        </TypeMask>
                    ) : (
                        <TypeDefault
                            id={id}
                            type={type}
                            label={label}
                            placeholder={placeholder}
                            disable={disable}
                            isRequired={isRequired}
                            register={register}
                            errors={errors}
                            customValidator={customValidator}>
                        </TypeDefault>
                    )}
                </>
            )}

            {type === 'select' && (
                <TypeSelect
                    id={id}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    placeHolderSearchSelect={placeHolderSearchSelect}
                    listDrop={listDrop}
                    bindLabel={bindLabel}
                    loadingData={loadingData}
                    bindValue={bindValue}
                    searchSelect={searchSelect}
                    txtSearchEmpty={txtSearchEmpty}
                    multiple={multiple}
                    disable={disable}
                    isRequired={isRequired}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}>
                </TypeSelect>
            )}

            {type === 'radio' && (
                <TypeRadio
                    id={id}
                    type={type}
                    label={label}
                    bindValueRadio={bindValueRadio}
                    radioItems={radioItems}
                    disable={disable}
                    displayInline={displayInline}
                    isRequired={isRequired}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}>
                </TypeRadio>
            )}

            {(type === 'switch' || type === 'checkbox') && (
                <TypeCheckbox
                    id={id}
                    type={type}
                    label={label}
                    disable={disable}
                    isRequired={isRequired}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    labelCheckbox={labelCheckbox}
                    subCheckboxLabel={subCheckboxLabel}
                    labelLink={labelLink}
                    labelLinkTarget={labelLinkTarget}
                    displayInline={displayInline}
                    checkItems={checkItems}>
                </TypeCheckbox>
            )}

            {type === 'textarea' && (
                <TypeTextarea
                    id={id}
                    type={type}
                    label={label}
                    placeholder={placeholder}
                    disable={disable}
                    isRequired={isRequired}
                    register={register}
                    errors={errors}>
                </TypeTextarea>
            )}

            {type === 'tags' && (
                <TypeTag
                    id={id}
                    type={'tags'}
                    label={label}
                    placeholder={placeholder}
                    disable={disable}
                    showRemoveTag={showRemoveTag}
                    isRequired={isRequired}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}>
                </TypeTag>
            )}
        </>
    );
};

export default DefaultInput;
