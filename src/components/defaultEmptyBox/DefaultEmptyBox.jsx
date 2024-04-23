import React from 'react';
import '../../assets/styles/defaultEmptyBox.scss';

const DefaultEmptyBox = ({
                             loadingData = false,
                             removeShadow = true,
                             title = '',
                             description = '',
                             descriptionHtml = '',
                             descriptionContinue = '',
                             textLink = '',
                             link = '',
                             data = '',
                             textBtn = '',
                             handleActionEmptyBox
                         }) => {

    const sendAction = () => {
        handleActionEmptyBox({ type: 'empty-button', data });
    };

    return (
        <>
            {!loadingData && (
                <div className="container-empty-box">
                    <div className={`box-rounded-white ${removeShadow ? 'remove-shadow' : ''}`}>
                        <div className="box-max-width">
                            <h4 className="title-box">{title}</h4>

                            {link && description && (
                                <p className="description-txt">
                                    {description},
                                    <a href={link}>{textLink}</a>
                                    {descriptionContinue && <span>{descriptionContinue}</span>}
                                </p>
                            )}

                            {!link && description && (
                                <p className="description-txt">{description}</p>
                            )}

                            {!link && descriptionHtml && (
                                <p className="description-txt" dangerouslySetInnerHTML={{ __html: descriptionHtml }}></p>
                            )}

                            {textBtn && (
                                <button onClick={sendAction} className="default-primary-btn">
                                    <span>{textBtn}</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DefaultEmptyBox;
