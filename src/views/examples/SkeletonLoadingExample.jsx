import React from 'react';
import SkeletonLoading from '../../components/skeletonLoading/SkeletonLoading';
import DefaultInput from '../../components/defaultInputTypes/DefaultInput';
import {useForm} from 'react-hook-form';

const listDisplay = [{id: 1, name: 'block'}, {id: 2, name: 'inline-block'}];

function SkeletonLoadingExample() {
    const {
        register: formData,
        setValue: setFormValue,
        watch: watchForm,
    } = useForm({ defaultValues: { width: '300px', height: '40px', margin: '10px 20px 0 0', display: {id: 1, name: 'block'} } }); // Set formState mode to 'all' for immediate validation

    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Skeleton loading</h4>
                        <p>Configurações aplicadas dentro do skeleton loading</p>
                    </div>
                </div>

                <div className="row">
                    <div className="col-3">
                        <DefaultInput
                            id={'width'}
                            type={'text'}
                            label={'Largura'}
                            placeholder={'40px'}
                            disable={false}
                            isRequired={false}
                            register={formData}>
                        </DefaultInput>
                    </div>
                    <div className="col-3">
                        <DefaultInput
                            id={'height'}
                            type={'text'}
                            label={'Altura'}
                            placeholder={'40px'}
                            disable={false}
                            isRequired={false}
                            register={formData}>
                        </DefaultInput>
                    </div>
                    <div className="col-3">
                        <DefaultInput
                            id={'margin'}
                            type={'text'}
                            label={'Margem'}
                            placeholder={'40px'}
                            disable={false}
                            isRequired={false}
                            register={formData}>
                        </DefaultInput>
                    </div>
                    <div className="col-3">
                        <DefaultInput
                            id={'display'}
                            type={'radio'}
                            label={'Tipo'}
                            radioItems={listDisplay}
                            displayInline={true}
                            disable={false}
                            isRequired={false}
                            setValue={setFormValue}
                            register={formData}
                            watch={watchForm}>
                        </DefaultInput>
                    </div>
                </div>

                <div className="col-12 offset-top-20">
                    <label className="additional-info">Custom</label>
                    <SkeletonLoading
                        type={'normal'}
                        width={watchForm('width')}
                        height={watchForm('height')}
                        margin={watchForm('margin')}
                        display={watchForm('display')?.name}/>
                    <SkeletonLoading
                        type={'normal'}
                        width={watchForm('width')}
                        height={watchForm('height')}
                        margin={watchForm('margin')}
                        display={watchForm('display')?.name}/>
                </div>
                <div className="col-12 offset-top-20">
                    <label className="additional-info">Table</label>
                    <SkeletonLoading
                        type={'table'}
                        totalRepeat={10}/>
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoadingExample;
