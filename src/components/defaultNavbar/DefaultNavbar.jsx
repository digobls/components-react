import React from 'react';
import '../../assets/styles/defaultNavbar.scss';

const DefaultNavbar = () => {
    return (
        <div className="default-navbar">
            <div className="container-avatar">
                <div className="bg">
                    <div className="rounded-name">
                        <span>RP</span>
                    </div>
                </div>
                <div className="container-name">
                    <span>Rodrigo Pereira</span>
                    <i className="ri-arrow-down-s-line"></i>
                </div>
            </div>
        </div>
    );
};

export default DefaultNavbar;