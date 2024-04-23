import React, { useState, useEffect } from 'react';
import DefaultSimpleTable from '../components/defaultSimpleTable/DefaultSimpleTable';

function UsersList() {
    // const [users2, setUsers2] = useState([]);
    //
    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then((response) => response.json())
    //         .then((data) => setUsers2(data));
    // }, []);

    const listHeader = [
        { key: 'id', label: 'ID', isVisible: true },
        { key: 'name', label: 'Nome', isVisible: true, sortable: true, sortOrder: '' },
        { key: 'phone', label: 'Telefone', isVisible: true, sortable: false, usePipe: true, isPhone: true },
        { key: 'email', label: 'E-mail', isVisible: true, sortable: true, sortOrder: '' },
        { key: 'documentNumber', label: 'Documento', isVisible: true, sortable: false, usePipe: true, isDocument: true },
        { key: 'dateBirthday', label: 'Data de aniversário', isVisible: true, sortable: false, usePipe: true, isDate: true },
        { key: 'remuneration', label: 'Remuneração', isVisible: true, sortable: false, usePipe: true, isCurrency: true },
        { key: 'gender', label: 'Sexo', isVisible: true, sortable: false, usePipe: true, isJson: true, jsonKey: 'name' },
        { key: 'tags', label: 'Tags', isVisible: true, sortable: false, usePipe: true, isArray: true },
        { key: 'actions', label: 'Ações', isVisible: true, sortable: false,
            actions: [
                {type: 'view', label: 'Visualizar', link: '/usuario/editar', pathname: ['id'], params: ['id', 'name'], demo: false},
                {type: 'edit', label: 'Editar', link: '/usuario/editar', pathname: ['id'], params: ['id'], demo: false},
                {type: 'delete', label: 'Excluir'},
                {icon: 'ri-file-pdf-2-line', label: 'Custom', externalLink: 'https://google.com.br', target: '_blank', demo: false}
            ]
        }
    ];

    const users = [
        { id: 1, name: 'João', email: 'joao@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 2, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 3, name: 'Pedro', email: 'pedro@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 4, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 5, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 6, name: 'João', email: 'joao@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 7, name: 'João', email: 'joao@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 8, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 9, name: 'Pedro', email: 'pedro@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 10, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 11, name: 'Maria', email: 'maria@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}},
        { id: 12, name: 'João', email: 'joao@example.com', dateBirthday: '1991-07-22', remuneration: 14000, phone: '41999940776', documentNumber: '05226923970', tags: ["Angular", "Javascript", "CSS", "HTML"], gender: {'id': 2, 'name': "Feminino"}}
    ];

    // On change list sort
    const handleListSortChange = (data) => {
        console.log('handleListSortChange', data);
    }

    const handleDataAction = (data) => {
        console.log('handleDataAction', data);
    }

    const handlePagination = (data) => {
        console.log('handlePagination', data);
    }

    return (
        <div className="container">
            <div>
                <h2>Listagem de Usuários</h2>
                <DefaultSimpleTable
                    showDisplay={true}
                    paginationInfo={true}
                    showChangeTotal={true}
                    initialListHeader={listHeader}
                    listData={users}
                    onChangeListSort={handleListSortChange}
                    onDataAction={handleDataAction}
                    onChangePagination={handlePagination}
                />
            </div>
        </div>
    );
}

export default UsersList;
