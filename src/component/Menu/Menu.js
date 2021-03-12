import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

const Menu = ({ children, header }) => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <>
            <div style={{ cursor: 'pointer' }} onClick={toggleMenu}>
                {header}
            </div>
            <nav ref={dropdownRef} onClick={toggleMenu}>
                {isActive ? children : null}
            </nav>
        </>
    );
};

export default Menu;
