import React from 'react';
import '../../assets/styles/defaultLoadingButton.scss';

const DefaultButtonLoading = ({
                                  id = '',
                                  type = 'button',
                                  text = '',
                                  showIcon = false,
                                  iconRight = false,
                                  classIcon = '',
                                  disabled = false,
                                  loading = false,
                                  handleButtonClick
                              }) => {

    const clickButton = () => {
        if (!disabled && !loading) {
            handleButtonClick();
        }
    };

    return (
        <button
            id={id}
            type={type}
            onClick={clickButton}
            disabled={disabled || loading}
            className={`default-primary-btn ${disabled || loading ? 'btn-disabled' : ''}`}>

            <div className={`container-button ${iconRight ? 'reverse' : ''}`}>
                {loading ? (
                    <div className="default-loading-btn">
                        <div className="spinner-btn">
                            <div className="rect1"></div>
                            <div className="rect2"></div>
                            <div className="rect3"></div>
                            <div className="rect4"></div>
                            <div className="rect5"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        <span>{text}</span>
                        {showIcon && classIcon && (
                            <i className={classIcon}></i>
                        )}
                    </>
                )}
            </div>
        </button>
    );
};

export default DefaultButtonLoading;