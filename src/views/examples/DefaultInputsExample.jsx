import React from 'react';
import DefaultInput from '../../components/defaultInputTypes/DefaultInput';
import {useForm} from 'react-hook-form';

function DefaultInputsExample() {
    const {
        register: formInput,
        setValue: setFormInput,
        watch: watchFormInput,
    } = useForm({
        defaultValues:
            {
                type: 'text',
                label: 'Exemplo',
                placeholder: 'Exemplo de placeholder',
                mask: '',
                disable: false,
                multiple: false,
                listCheck: false
            }
    }); // Set formState mode to 'all' for immediate validation

    const listType = [
        'text',
        'number',
        'date',
        'password',
        'select',
        'tag',
        'textarea',
        'switch',
        'checkbox',
        'radio',
    ];
    const listNames = [
        {id: 1, name: 'Ana Silva'},
        {id: 2, name: 'Carlos Oliveira'},
        {id: 3, name: 'Bruna Almeida'},
        {id: 4, name: 'Rodrigo Pereira'},
        {id: 5, name: 'Diego Santos'},
        {id: 6, name: 'Elisa Costa'},
        {id: 7, name: 'Felipe Pereira'},
        {id: 8, name: 'Giovana Souza'},
        {id: 9, name: 'Henrique Lima'}
    ];
    const listTypeContact = [
        {id: 1, name: 'E-mail'},
        {id: 2, name: 'Telefone'},
        {id: 3, name: 'Todos'},
    ];

    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Input</h4>
                        <p>Configurações aplicadas do input</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <DefaultInput
                            id={'type'}
                            type={'select'}
                            label={'Tipo do botão'}
                            placeholder={'Selecione o tipo'}
                            listDrop={listType}
                            searchSelect={true}
                            multiple={false}
                            disable={false}
                            isRequired={false}
                            setValue={setFormInput}
                            register={formInput}
                            watch={watchFormInput}>
                        </DefaultInput>
                    </div>
                    <div className="col-2">
                        <DefaultInput
                            id={'label'}
                            type={'text'}
                            label={'label'}
                            placeholder={'Digite o label'}
                            isRequired={false}
                            register={formInput}>
                        </DefaultInput>
                    </div>
                    <div className="col-2">
                        <DefaultInput
                            id={'placeholder'}
                            type={'text'}
                            label={'Placeholder'}
                            placeholder={'Digite o placeholder'}
                            isRequired={false}
                            register={formInput}>
                        </DefaultInput>
                    </div>
                    <div className="col-12"></div>
                    <div className="col-3">
                        <DefaultInput
                            id={'disable'}
                            type={'checkbox'}
                            labelCheckbox={'Desabilitar'}
                            displayInline={true}
                            setValue={setFormInput}
                            register={formInput}
                            watch={watchFormInput}>
                        </DefaultInput>
                    </div>
                    <div className="col-12"></div>
                    {watchFormInput('type') === 'select' && (
                        <div className="col-3">
                            <DefaultInput
                                id={'multiple'}
                                type={'checkbox'}
                                labelCheckbox={'Multiplo valores'}
                                displayInline={true}
                                setValue={setFormInput}
                                register={formInput}
                                watch={watchFormInput}>
                            </DefaultInput>
                        </div>
                    )}
                </div>

                <div className="col-12 offset-top-30">
                    <DefaultInput
                        id={'id'}
                        type={watchFormInput('type')}
                        label={watchFormInput('label')}
                        placeholder={watchFormInput('placeholder')}
                        loading={watchFormInput('loading')}
                        multiple={watchFormInput('multiple')}
                        mask={watchFormInput('mask')}
                        disable={watchFormInput('disable')}
                        listDrop={listNames}
                        bindLabel={'name'}
                        searchSelect={true}
                        labelCheckbox={'Exemplo de checkbox'}
                        radioItems={listTypeContact}
                        displayInline={true}
                        setValue={setFormInput}
                        register={formInput}
                        watch={watchFormInput}/>
                </div>
            </div>
        </div>
    );
}

export default DefaultInputsExample;
