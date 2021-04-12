import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

import './Menu.scss';

const Menu = ({ children, icon, header }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div className='menu' onClick={toggleMenu}>
            {icon ? (
                <i className='material-icons md-36 md-circle'>{icon}</i>
            ) : (
                <div className='menu__header'>{header}</div>
            )}

            {isActive ? (
                <ol
                    className='menu__list'
                    ref={dropdownRef}
                    onClick={toggleMenu}>
                    {children}
                </ol>
            ) : null}
        </div>
    );
};

export default Menu;
