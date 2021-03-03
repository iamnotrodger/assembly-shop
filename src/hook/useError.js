import { useState, useCallback } from 'react';

const useError = () => {
    const [, setError] = useState();
    return useCallback(
        (error) => {
            setError(() => {
                throw error;
            });
        },
        [setError],
    );
};

export default useError;
