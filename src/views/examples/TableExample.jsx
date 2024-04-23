import React, { useState, useEffect } from 'react';
import DefaultSimpleTable from '../../components/defaultSimpleTable/DefaultSimpleTable';

function TableExample() {
    const [dataLoading, setDataLoading] = useState(false);

    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then((response) => response.json())
    //         .then((data) => setUsers2(data));
    // }, []);

    const listHeader = [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'Nome', sortable: true, sortOrder: '' },
        { key: 'phone', label: 'Telefone', sortable: false, usePipe: true, isPhone: true },
        { key: 'email', label: 'E-mail', sortable: true, sortOrder: '' },
        { key: 'documentNumber', label: 'Documento', sortable: false, usePipe: true, isDocument: true },
        { key: 'dateBirthday', label: 'Data de aniversário', sortable: false, usePipe: true, isDate: true },
        { key: 'remuneration', label: 'Remuneração', sortable: false, usePipe: true, isCurrency: true },
        { key: 'gender', label: 'Sexo', sortable: false, usePipe: true, isJson: true, jsonKey: 'name' },
        { key: 'tags', label: 'Tags', sortable: false, usePipe: true, isArray: true },
        { key: 'actions', label: 'Ações', sortable: false,
            actions: [
                {type: 'view', label: 'Visualizar', link: '/usuario/editar', pathname: ['id'], params: ['id', 'name'], demo: false},
                {type: 'edit', label: 'Editar', link: '/usuario/editar', pathname: ['id'], params: ['id'], demo: false},
                {type: 'delete', label: 'Excluir', demo: false},
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

    const dataPagination = {
        currentPage: 1,
        totalRecordsPerPage: 20,
        totalRecords: 220
    };

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

    const executeAction = () => {
        console.log('teste', dataLoading);
        setDataLoading(!dataLoading)
    }
    return (
        <div className="col-12 box-rounded-white offset-top-20">
            <div className="row">
                <div className="col-12">
                    <div className="container-title-description">
                        <h4>Tabela</h4>
                        <p>Configurações aplicadas da tabela</p>
                    </div>
                </div>

                <div className="col-12">
                    <DefaultSimpleTable
                        loading={false}
                        initialListHeader={listHeader}
                        listData={users}
                        initialConfigPagination={dataPagination}
                        showDisplay={true}
                        paginationInfo={true}
                        maxSize={5}
                        showChangeTotal={true}
                        onChangeListSort={handleListSortChange}
                        onDataAction={handleDataAction}
                        onChangePagination={handlePagination}
                    />
                </div>
            </div>
        </div>
    );
}

export default TableExample;
