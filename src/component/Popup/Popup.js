import React, { useRef } from 'react';
import useDetectOutsideClick from '../../hook/useDetectOutsideClick';

const Popup = ({ children, trigger }) => {
    const popupRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(popupRef, false);

    const toggleClick = () => {
        setIsActive(true);
    };

    const closePopup = () => {
        setIsActive(false);
    };

    return (
        <>
            <div onClick={toggleClick}>{trigger}</div>
            <div
                ref={popupRef}
                style={{
                    display: isActive ? 'block' : 'none',
                    background: 'red',
                }}>
                <button onClick={closePopup}>Close</button>
                {children}
            </div>
        </>
    );
};

export default Popup;
