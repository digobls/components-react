import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiInputField, RiFileCopyLine, RiUser3Line, RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from '@remixicon/react';
import '../../assets/styles/defaultSidebar.scss';

const DefaultSidebar = ({ onMenuStatusChange }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
        setShowMenu(false);
        onMenuStatusChange(isExpanded);
    };

    const expand = () => {
        setShowMenu(true);
    };

    const collapse = () => {
        setShowMenu(false);
    };

    const showAlert = () => {
        // Implementação do alerta aqui
    };

    return (
        <nav className={`default-sidebar ${isExpanded || showMenu ? 'expanded' : ''}`}
             onMouseEnter={expand}
             onMouseLeave={collapse}>
            <div className="navbar-header">
                <ul>
                    <li className="head-logo">
                        <div className="close-and-open-menu">
                            {isExpanded ? (
                                <RiArrowLeftDoubleLine onClick={toggleMenu} size="15" />
                            ) : (
                                <RiArrowRightDoubleLine onClick={toggleMenu} size="15" />
                            )}
                        </div>
                    </li>
                </ul>
            </div>

            <ul className="navigation">
                <li>
                    <Link to="/componentes" title="Componentes">
                        <RiFileCopyLine size="14"/>
                        <span>Componentes</span>
                    </Link>
                </li>
                {/*<li>*/}
                {/*    <Link to="/form/simple" title="Elementos de formulário">*/}
                {/*        <RiInputField size="14" />*/}
                {/*        <span>Formulário</span>*/}
                {/*    </Link>*/}
                {/*</li>*/}

                <li>
                    <Link to="/usuarios" title="Lista de usuário">
                        <RiUser3Line size="14" />
                        <span>Lista de usuário</span>
                    </Link>
                </li>
                {/*<li>*/}
                {/*    <Link to="/usuario/cadastro" title="Cadastro de usuário">*/}
                {/*        <RiUser3Line size="14" />*/}
                {/*        <span>Cadastro de usuário</span>*/}
                {/*    </Link>*/}
                {/*</li>*/}
            </ul>
        </nav>
    );
};

export default DefaultSidebar;