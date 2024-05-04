import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DefaultSimpleTable from '../../components/defaultSimpleTable/DefaultSimpleTable';

const listHeaderTable = [
    {key: 'fullName', label: 'Usuário', sortable: false},
    {key: 'email', label: 'E-mail', sortable: false},
    {key: 'documentNumber', label: 'Documento', sortable: false, usePipe: true, isDocument: true},
    {key: 'dateBirthday', label: 'Data de aniversário', sortable: false, usePipe: true, isDate: true},
    {
        key: 'actions', label: 'Ações', sortable: false,
        actions: [
            {type: 'edit', label: 'Editar', link: '/usuarios/editar', pathname: ['id']},
            {type: 'delete', label: 'Excluir'},
        ]
    }
];

function ListUsers() {
    const [listUser, setListUser] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalRecordsPerPage: 20,
        totalRecords: 220
    });
    const showUserApi = 'http://localhost:3002/users';

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios
            .get(showUserApi)
            .then((response) => {
                setListUser(response.data);
                setPagination({...pagination , totalRecords: response.data.length});
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDataAction = (data) => {
        switch (data.action.type) {
            case 'delete':
                checkRemove(data?.row);
                break
        }
    }

    const checkRemove = (data) => {
        console.log('data', data);
        // TODO:: Modal confirm aviso
        removeUser(data);
    }

    const removeUser = (data) => {
        axios
            .delete(`${showUserApi}/${data.id}`)
            .then((response) => {
                getUsers();
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const handlePagination = (data) => {
        console.log('handlePagination', data);
    }

    return (
        <div className="list-user">
            <div className="col-12">
                <div className="container-filter-new-useqr">
                    <div className="container-btn">
                        <Link to="cadastro" className="btn-new-user">Novo usuário</Link>
                    </div>
                </div>
            </div>
            <div className="col-12 box-rounded-white offset-top-20">

                {listUser?.length >= 1 && (
                    <DefaultSimpleTable
                        loading={false}
                        initialListHeader={listHeaderTable}
                        listData={listUser}
                        initialConfigPagination={pagination}
                        showDisplay={true}
                        paginationInfo={true}
                        maxSize={5}
                        showChangeTotal={true}
                        onDataAction={handleDataAction}
                        onChangePagination={handlePagination}/>
                )}
            </div>
        </div>
    )
}

export default ListUsers;
