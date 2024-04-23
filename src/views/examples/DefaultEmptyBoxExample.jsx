import React from 'react';
import DefaultEmptyBox from '../../components/defaultEmptyBox/DefaultEmptyBox';

function DefaultEmptyBoxExample() {
    const handleActionEmptyBox = (data) => {
        console.log('handleActionEmptyBox', data)
    }

    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Container vazio</h4>
                        <p>Configurações aplicadas do empty box</p>
                    </div>
                </div>

                <div className="col-12">
                <DefaultEmptyBox
                        loadingData={false}
                        removeShadow={true}
                        title={'Você ainda não possui nenhum usuário cadastrado'}
                        description={'Dê o primeiro passo para aproveitar ao máximo nossos recursos! Crie sua conta agora e tenha acesso exclusivo a uma variedade de funcionalidades personalizadas. É simples, rápido e gratuito. Não perca tempo, junte-se a nós e descubra um mundo de possibilidades!'}
                        descriptionHtml={''}
                        descriptionContinue={''}
                        textLink={''}
                        link={''}
                        textBtn={'Cadastrar usuário'}
                        handleActionEmptyBox={handleActionEmptyBox}
                    />
                </div>
            </div>
        </div>
    );
}

export default DefaultEmptyBoxExample;
