import { useEffect, useState } from 'react';

const useDetectOutsideClick = (reference, initialState) => {
    const [isActive, setIsActive] = useState(initialState);

    useEffect(() => {
        const pageClickEvent = (event) => {
            if (
                reference.current !== null &&
                !reference.current.contains(event.target)
            ) {
                setIsActive(!isActive);
            }
        };

        if (isActive) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        };
    }, [isActive, reference]);

    return [isActive, setIsActive];
};

export default useDetectOutsideClick;
