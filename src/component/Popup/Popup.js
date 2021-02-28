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
                    background: '#2699FB',
                }}>
                <button onClick={closePopup}>Close</button>
                <div style={{ paddingBottom: '500px' }}>{children}</div>
            </div>
        </>
    );
};

export default Popup;
