import React from 'react';
import DefaultButtonLoading from '../../components/defaultButtonLoading/DefaultButtonLoading';
import DefaultInput from '../../components/defaultInputTypes/DefaultInput';
import {useForm} from 'react-hook-form';

function SkeletonLoadingExample() {
    const {
        register: formButton,
        setValue: setFormButton,
        watch: watchFormButton,
    } = useForm({defaultValues: {text: 'Salvar', loading: false, disable: false}}); // Set formState mode to 'all' for immediate validation

    const handleButtonClick = () => {
        console.log('clickButton');
        setFormButton('loading', true);
        setTimeout(() => {
            setFormButton('loading', false);
        }, 2000);
    }

    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Loading button</h4>
                        <p>Configurações aplicadas dentro do loading button</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-2">
                        <DefaultInput
                            id={'text'}
                            type={'text'}
                            label={'Texto botão'}
                            placeholder={'Texto botão'}
                            disable={false}
                            isRequired={false}
                            register={formButton}>
                        </DefaultInput>
                    </div>
                    <div className="col-12"></div>
                    <div className="col-3">
                        <DefaultInput
                            id={'loading'}
                            type={'checkbox'}
                            labelCheckbox={'Loading'}
                            displayInline={true}
                            setValue={setFormButton}
                            register={formButton}
                            watch={watchFormButton}>
                        </DefaultInput>
                    </div>
                    <div className="col-3">
                        <DefaultInput
                            id={'disable'}
                            type={'checkbox'}
                            labelCheckbox={'Desabilitar botão'}
                            displayInline={true}
                            setValue={setFormButton}
                            register={formButton}
                            watch={watchFormButton}>
                        </DefaultInput>
                    </div>
                </div>

                <div className="col-12 offset-top-30">
                    <DefaultButtonLoading
                        id={'id'}
                        type={'button'}
                        text={watchFormButton('text')}
                        disabled={watchFormButton('disable')}
                        loading={watchFormButton('loading')}
                        handleButtonClick={handleButtonClick}/>
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoadingExample;
