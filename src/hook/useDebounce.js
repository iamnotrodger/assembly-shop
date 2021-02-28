import { useCallback } from 'react';
import debounce from 'lodash.debounce';

const useDebounce = (callback, delay) => {
    const debounceFunction = useCallback(
        debounce((...args) => callback(...args), delay),
        [delay],
    );
    return debounceFunction;
};

export default useDebounce;
