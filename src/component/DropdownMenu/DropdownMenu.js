import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

const DropdownMenu = ({ children, header }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div>
            <div style={{ cursor: 'pointer' }} onClick={toggleMenu}>
                {header}
            </div>
            <nav
                ref={dropdownRef}
                onClick={toggleMenu}
                style={{ display: isActive ? 'block' : 'none' }}>
                {children}
            </nav>
        </div>
    );
};

export default DropdownMenu;
