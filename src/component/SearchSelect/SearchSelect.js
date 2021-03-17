import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useDebounce from '../../hook/useDebounce';

const SearchSelect = ({ search, ...props }) => {
    const [options, setOptions] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchLoading, setSearchLoading] = useState(false);

    const loadOptions = useDebounce(async (input) => {
        setSearchLoading(true);
        try {
            const users = await search(input);
            setOptions(users);
        } catch (error) {
            console.log(error);
        }
        setSearchLoading(false);
    }, 250);

    useEffect(() => {
        return loadOptions.cancel();
    }, [loadOptions]);

    const handleSearchChange = (value) => {
        setSearchInput(value);
        if (value) loadOptions(value);
        else setOptions([]);
    };

    return (
        <Select
            inputValue={searchInput}
            onInputChange={handleSearchChange}
            options={options}
            isLoading={searchLoading}
            {...props}
        />
    );
};

export default SearchSelect;
