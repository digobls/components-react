import React from 'react';
import {Modal} from 'react-bootstrap';
import {RiCheckboxCircleLine, RiCloseCircleLine, RiCloseLine, RiErrorWarningLine} from '@remixicon/react';

const ModalAlert = ({show, onHide, data, onConfirm}) => {
    const descriptionIsString = typeof data?.description === 'string';

    const confirmActionModal = () => {
        onConfirm({type: data?.type || '', value: data?.data?.row || ''});
        onHide();
    }

    return (
        <Modal id='modalCustomAlert' show={show} onHide={onHide}>
            <div className="modal-body modal-custom-alert">
                <a onClick={onHide} type="button" className="close" aria-label="Close">
                    <RiCloseLine size="22"></RiCloseLine>
                </a>

                <div className="row">
                    <div className="col-12 content-title">
                        {data?.showDangerIcon && (
                            <span className="danger-icon">
                                <RiCloseCircleLine size="20"></RiCloseCircleLine>
                            </span>
                        )}
                        {data?.showWarningIcon && (
                            <span className="warning-icon">
                                <RiErrorWarningLine size="20"></RiErrorWarningLine>
                            </span>
                        )}
                        {data?.showSuccessIcon && (
                            <span className="success-icon">
                                <RiCheckboxCircleLine size="20"></RiCheckboxCircleLine>
                            </span>
                        )}
                        <h2 className="title">{data.title}</h2>
                    </div>

                    <div className="col-12">
                        {!data.description && (
                            <p className="description-info">Desculpe, ocorreu uma falha, tente novamente ou ntre em
                                contato com o suporte.</p>
                        )}

                        {descriptionIsString && data?.description && (
                            <p className="description-info">{data.description}</p>
                        )}

                        {!descriptionIsString && (
                            <ul>
                                {data?.description?.map((data) => (
                                    <li>
                                        <span className="description-info">{{data}}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="content-footer">
                    {data?.showCancelBtn && (
                        <button onClick={onHide} id="cancelAlert" type="button" className="btn btn-close">
                            <span>{data?.customTxtCancel ? data.customTxtCancel : 'Fechar'}</span>
                        </button>
                    )}

                    {data?.showConfirmBtn && (
                        <button onClick={confirmActionModal} id="closeAlert" type="submit" className="btn btn-primary">
                            <span>{data?.customTxtConfirm ? data.customTxtConfirm : 'Confirmar'}</span>
                        </button>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default ModalAlert;