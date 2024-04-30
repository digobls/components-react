import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import TypeDefault from '../components/defaultInputTypes/TypeDefault';
import TypeTag from '../components/defaultInputTypes/TypeTag';
import TypeRadio from '../components/defaultInputTypes/TypeRadio';
import TypeTextarea from '../components/defaultInputTypes/TypeTextarea';
import TypeCheckbox from '../components/defaultInputTypes/TypeCheckbox';
import TypeMask from '../components/defaultInputTypes/TypeMask';

function Form() {
    const {
        register: formData,
        setValue: setFormValue,
        handleSubmit: handleSubmitForm,
        watch: watchForm,
        control: controlUser,
        getValues: getFormValues,
        trigger: triggerForm,
        reset: resetDataForm,
        clearErrors: clearFormErrors,
        formState: {isValid: formValid, errors: formErrors},
    } = useForm({mode: 'all'}); // Set formState mode to 'all' for immediate validation
    const [disableForm, setDisableForm] = useState(false);

    const listTypeContact = [
        {id: 1, name: 'E-mail', checked: false},
        {id: 2, name: 'Telefone', checked: false},
        {id: 3, name: 'Todos', checked: false},
    ];

    const setDataForm = async (e) => {
        setFormValue('name', 'Rodrigo Pereira');
        setFormValue('email', 'digo.bls@hotmail.com');
        setFormValue('phone', '41999940776');
        setFormValue('documentNumber', '60686622090');
        setFormValue('date', '1991-04-10');
        setFormValue('dateMask', '22/07/1991');
        setFormValue('money', '150000');
        setFormValue('tags', ['tag1', 'rodrigo', 'terceira']);
        setFormValue('radio', {id: 2, name: 'Telefone'});
        setFormValue('radioList', {id: 1, name: 'E-mail'});
        setFormValue('switch', true);
        setFormValue('checkbox', true);
        setFormValue('checkboxList', [{id: 1, name: 'E-mail', checked: true}, {id: 2, name: 'Telefone', checked: true}]);
        setFormValue('description', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.');

        // Checks the form after adding values to remove error warnings
        await triggerForm();
    };

    // Check data form
    const checkForm = async (e) => {
        const isValidForm = await triggerForm();
        if (isValidForm) {
            console.log('Valor do formulário ->', getFormValues());
        }
    };

    // Reset data form
    const resetForm = async (e) => {
        // Reseta os valores dos campos do formulário, funciona dentro do FORM apenas
        resetDataForm();

        // Alternativa para resetar valores do form fora da tag <form
        // const fieldNames = Object.keys(getFormValues());
        // fieldNames.forEach((fieldName) => {
        //     setFormValue(fieldName, null);
        // });

        // Reseta os erros de validação
        clearFormErrors();
    };

    // Disable form
    const changeDisableForm = async () => {
        setDisableForm(!disableForm);
    };

    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div>
                <h2>Formulário de Exemplo</h2>

                <div className="col-12 content-buttons offset-top-10">
                    <button onClick={() => setDataForm()} className="simple-btn">Preencher Formulário</button>
                    <button onClick={() => resetForm()} className="simple-btn">Resetar Formulário</button>
                    <button onClick={() => changeDisableForm()} className="simple-btn">Desabilitar Formulário</button>
                    <button onClick={() => checkForm()} className="simple-btn">Verificar Formulário</button>
                </div>

                <form className="row">
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeDefault
                            id={'name'}
                            type={'text'}
                            label={'Nome'}
                            placeholder={'Texto'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                            customValidator={{fullName: true, minLength: 5}}>
                        </TypeDefault>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeDefault
                            id={'email'}
                            type={'text'}
                            label={'E-mail'}
                            placeholder={'Email e validação'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                            customValidator={{email: true}}>
                        </TypeDefault>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeMask
                            id={'phone'}
                            type={'text'}
                            label={'Telefone'}
                            placeholder={'Telefone e mascara'}
                            mask={'phone'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}>
                        </TypeMask>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeMask
                            id={'documentNumber'}
                            type={'text'}
                            label={'CPF ou CNPJ'}
                            placeholder={'Documento mascara e validação'}
                            mask={'document'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                            customValidator={{document: true}}>
                        </TypeMask>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeMask
                            id={'dateMask'}
                            type={'text'}
                            label={'Data'}
                            placeholder={'Data mascara'}
                            mask={'date'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}>
                        </TypeMask>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeDefault
                            id={'date'}
                            type={'date'}
                            label={'Data'}
                            placeholder={'Data simples'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}>
                        </TypeDefault>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeMask
                            id={'money'}
                            type={'text'}
                            label={'Dinheiro'}
                            placeholder={'Preencha um valor'}
                            mask={'currency'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}>
                        </TypeMask>
                    </div>
                    <div className="col-12 col-md-6 offset-top-10">
                        <TypeTag
                            id={'tags'}
                            type={'text'}
                            label={'Tags'}
                            placeholder={'Preencha as tags'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}>
                        </TypeTag>
                    </div>
                    <div className="col-12 col-md-12 offset-top-10">
                        <TypeTextarea
                            id={'description'}
                            type={'textarea'}
                            label={'Descrição'}
                            placeholder={'Descrição'}
                            disable={disableForm}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                        ></TypeTextarea>
                    </div>
                    <div className="col-12 col-md-12 offset-top-10">
                        <TypeCheckbox
                            id={'switch'}
                            type={'switch'}
                            label={'Switch'}
                            disable={disableForm}
                            isRequired={false}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}>
                        </TypeCheckbox>
                    </div>
                    <div className="col-12 col-md-12 offset-top-10">
                        <TypeCheckbox
                            id={'checkbox'}
                            type={'checkbox'}
                            label={'Checkbox'}
                            labelCheckbox={'Confirmar'}
                            subCheckboxLabel={'termos de uso'}
                            labelLink={'https://google.com.br'}
                            disable={disableForm}
                            isRequired={true}
                            displayInline={false}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}>
                        </TypeCheckbox>
                    </div>
                    <div className="col-12 col-md-12 offset-top-20">
                        <TypeCheckbox
                            id={'checkboxList'}
                            type={'checkbox'}
                            label={'Checkbox list'}
                            disable={disableForm}
                            checkItems={listTypeContact}
                            isRequired={true}
                            displayInline={true}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}>
                        </TypeCheckbox>
                    </div>
                    <div className="col-12 col-md-12 offset-top-20">
                        <TypeRadio
                            id={'radio'}
                            type={'radio'}
                            label={'Radio lista horizontal'}
                            radioItems={listTypeContact}
                            disable={disableForm}
                            displayInline={true}
                            isRequired={true}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}
                        ></TypeRadio>
                    </div>
                    <div className="col-12 col-md-12 offset-top-20">
                        <TypeRadio
                            id={'radioList'}
                            type={'radio'}
                            label={'Radio lista horizontal'}
                            radioItems={listTypeContact}
                            disable={disableForm}
                            displayInline={false}
                            isRequired={true}
                            bindValueRadio={'id'}
                            register={formData}
                            errors={formErrors}
                            watch={watchForm}
                            setValue={setFormValue}
                        ></TypeRadio>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;