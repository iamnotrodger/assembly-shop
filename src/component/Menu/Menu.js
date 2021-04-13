import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

import './Menu.scss';

const Menu = ({ children, header, className }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div className='menu' onClick={toggleMenu}>
            <div className='menu__header'>{header}</div>

            {isActive ? (
                <ol
                    className={`menu__list ${className || ''}`}
                    ref={dropdownRef}
                    onClick={toggleMenu}>
                    {children}
                </ol>
            ) : null}
        </div>
    );
};

export default Menu;
