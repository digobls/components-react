import React, { useState, useEffect } from 'react';
import DefaultButtonLoading from '../../components/defaultButtonLoading/DefaultButtonLoading';

function SkeletonLoadingExample() {
    const [loadingSend, setLoadingSend] = useState(false);
    const handleButtonClick = () => {
        console.log('clickButton');
        setLoadingSend(true);
        setTimeout( () => {
            setLoadingSend(false);
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

                <div className="col-12">
                    <DefaultButtonLoading
                        id={'id'}
                        type={'button'}
                        text={'Salvar'}
                        showIcon={false}
                        iconRight={false}
                        disabled={false}
                        loading={loadingSend}
                        handleButtonClick={handleButtonClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default SkeletonLoadingExample;
