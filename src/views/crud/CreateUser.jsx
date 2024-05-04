import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import DefaultInput from '../../components/defaultInputTypes/DefaultInput';
import DefaultButtonLoading from '../../components/defaultButtonLoading/DefaultButtonLoading';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import ModalAlert from '../../components/modalAlert/ModalAlert';

function CreateUser() {
    const {id} = useParams();
    const {
        register: formUser,
        setValue: setFormUser,
        watch: watchFormUser,
        trigger: triggerForm,
        getValues: getFormValues
    } = useForm({
        defaultValues:
            {
                fullName: '',
                email: '',
                phone: '',
                documentNumber: '',
                dateBirthday: '',
                remuneration: '',
                languages: '',
                role: '',
                gender: '',
                tags: '',
                description: '',
                terms: ''
            }
    });
    const navigate = useNavigate();
    const showUserApi = 'http://localhost:3002/users';
    const [loadingData, setLoadingData] = useState(false);
    const [loadingSend, setLoadingSend] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dataModal, setDataModal] = useState({
        showSuccessIcon: true,
        showCancelBtn: false,
        showConfirmBtn: true
    });

    const [listLanguages, setListLanguages] = useState([]);
    const [loadingList, setLoadingList] = useState(false);

    const [listRoles, setListRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(false);

    const listGender = [
        {id: 1, name: 'Masculino'},
        {id: 2, name: 'Feminino'},
        {id: 0, name: 'Outro'},
    ];

    const createUser = () => {
        console.log('Valor do formulário ->', getFormValues());
        axios
            .post(showUserApi, getFormValues())
            .then((response) => {
                setLoadingSend(false);
                setDataModal({
                    ...dataModal,
                    showSuccessIcon: true,
                    showWarningIcon: false,
                    showConfirmBtn: true,
                    showCancelBtn: false,
                    title: 'Sucesso',
                    description: 'Usuário cadastrado com sucesso.',
                    size: 'md'
                });
                openModal();
            })
            .catch((err) => {
                setLoadingSend(false);
                console.log(err);
            });
    }

    const changeUser = () => {
        console.log('Valor do formulário ->', getFormValues());

        const dataSend = {...getFormValues(), id};
        setLoadingSend(true);
        axios
            .put(`${showUserApi}/${id}`, dataSend)
            .then((response) => {
                setLoadingSend(false);
                setDataModal({
                    ...dataModal,
                    title: 'Sucesso',
                    description: 'Usuário alterado com sucesso.',
                    size: 'md'
                });
                openModal();
            })
            .catch((err) => {
                setLoadingSend(false);
                console.log(err);
            });
    }

    const checkSend = async () => {
        const isValidForm = await triggerForm();
        console.log('isValidForm', isValidForm);
        if (isValidForm) {
            if (!loadingSend) {
                setLoadingSend(true);
                if (id) {
                    changeUser();
                } else {
                    createUser();
                }
            }
        } else {
            setDataModal({
                ...dataModal,
                showSuccessIcon: false,
                showWarningIcon: true,
                showConfirmBtn: false,
                showCancelBtn: true,
                title: 'Aviso',
                description: 'Preenchar todos os campos obrigatórios para continuar.',
                size: 'md'
            });
            openModal();
        }
    }

    const loadLanguages = () => {
        setLoadingList(true);
        axios
            .get('http://localhost:3002/languages')
            .then((response) => {
                setListLanguages(response.data);
                setLoadingList(false);
            })
            .catch((err) => {
                setLoadingList(false);
                console.log(err);
            });
    }

    const loadRoles = () => {
        setLoadingRoles(true);
        axios
            .get('http://localhost:3002/roles')
            .then((response) => {
                setListRoles(response.data);
                setLoadingRoles(false);
            })
            .catch((err) => {
                setLoadingRoles(false);
                console.log(err);
            });
    }

    const loadUser = () => {
        setLoadingData(true)
        axios
            .get(`${showUserApi}/${id}`)
            .then((response) => {
                for (const key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        setFormUser(key, response.data[key]);
                    }
                }

                setLoadingData(false);
            })
            .catch((err) => {
                setLoadingData(false);
                console.log(err);
            });
    }

    useEffect(() => {
        loadLanguages();
        loadRoles();
    }, []);

    useEffect(() => {
        if (id && !loadingSend) {
            loadUser();
        }
    }, [id]);

    const cancel = () => {
        navigate('/usuarios');
    }

    const openModal = () => setShowModal(true);

    const closeModal = () => setShowModal(false);

    return (
        <div className="col-12 container-user">
            <div className="col-12 box-rounded-white offset-bottom-40">
                <div className="row">
                    <div className="col-12">
                        <h1 className="title">{id ? 'Editar usuário' : 'Cadastro de usuário'}</h1>
                    </div>

                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'fullName'}
                            type={'text'}
                            label={'Nome completo'}
                            placeholder={'Nome completo'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'email'}
                            type={'text'}
                            label={'Email'}
                            placeholder={'Email'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'phone'}
                            type={'text'}
                            mask={'phone'}
                            label={'Telefone'}
                            placeholder={'Telefone'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'documentNumber'}
                            type={'text'}
                            mask={'document'}
                            label={'CPF ou CNPJ'}
                            placeholder={'CPF ou CNPJ'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'dateBirthday'}
                            type={'date'}
                            label={'Data de nascimento'}
                            placeholder={'Data de nascimento'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'remuneration'}
                            type={'text'}
                            mask={'currency'}
                            label={'Remuneração'}
                            placeholder={'Remuneração'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'languages'}
                            type={'select'}
                            label={'Idiomas'}
                            placeholder={'Idiomas'}
                            loadingData={loadingList}
                            listDrop={listLanguages}
                            bindLabel={'name'}
                            bindValue={'id'}
                            searchSelect={true}
                            multiple={true}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'role'}
                            type={'select'}
                            label={'Perfil de acesso'}
                            placeholder={'Perfil de acesso'}
                            loadingData={loadingRoles}
                            listDrop={listRoles}
                            bindLabel={'name'}
                            searchSelect={true}
                            multiple={false}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'gender'}
                            type={'radio'}
                            label={'Sexo'}
                            radioItems={listGender}
                            displayInline={true}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-6 offset-top-20">
                        <DefaultInput
                            id={'tags'}
                            type={'tag'}
                            label={'Habilidades'}
                            placeholder={'Preencha suas habilidades'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-12 offset-top-20">
                        <DefaultInput
                            id={'description'}
                            type={'textarea'}
                            label={'Descrição'}
                            placeholder={'Descrição'}
                            disable={false}
                            isRequired={true}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="col-12 col-md-12 offset-top-20">
                        <DefaultInput
                            id={'terms'}
                            type={'checkbox'}
                            showLabel={false}
                            labelCheckbox={'Li e aceito os'}
                            subCheckboxLabel={'termos de uso.'}
                            labelLink={'https://google.com.br'}
                            labelLinkTarget={'_blank'}
                            disable={false}
                            isRequired={true}
                            displayInline={false}
                            setValue={setFormUser}
                            register={formUser}
                            watch={watchFormUser}>
                        </DefaultInput>
                    </div>
                    <div className="container-btn-bottom offset-top-10">
                        <button onClick={cancel} className="button-default btn-transparent">
                            <span>Cancelar</span>
                        </button>
                        <DefaultButtonLoading
                            id={'registerUser'}
                            text={id ? 'Salvar alterações' : 'Cadastrar'}
                            type={'button'}
                            loading={loadingSend}
                            disabled={loadingSend}
                            handleButtonClick={checkSend}>
                        </DefaultButtonLoading>
                    </div>

                    <ModalAlert
                        show={showModal}
                        onHide={closeModal}
                        onConfirm={() => {
                            navigate('/usuarios')
                        }}
                        data={dataModal}/>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
