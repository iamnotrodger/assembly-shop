import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

import './Menu.scss';

const Menu = ({ children, header, className, style }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div className='menu' onClick={toggleMenu} style={style}>
            {header}

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
