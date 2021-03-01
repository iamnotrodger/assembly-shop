import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

const DropdownMenu = ({ children, header }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <div>
            <button onClick={toggleMenu}>{header}</button>
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
