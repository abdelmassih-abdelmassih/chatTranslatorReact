import React from 'react';
import Select from 'react-select';

const LanguageDropdown = ({ language, setLanguage }) => {
    const languageOptions = [
        { value: 'English', label: 'English' },
        { value: 'Spanish', label: 'Spanish' },
        { value: 'Chinese', label: 'Chinese' },
        { value: 'Hindi', label: 'Hindi' },
        { value: 'Arabic', label: 'Arabic' },
        { value: 'Portuguese', label: 'Portuguese' },
        { value: 'Russian', label: 'Russian' },
        { value: 'Japanese', label: 'Japanese' },
        { value: 'German', label: 'German' },
        { value: 'French', label: 'French' }
    ];

    const handleChange = selectedOption => {
        setLanguage(selectedOption);
    };

    return (
        <Select
            options={languageOptions}
            onChange={handleChange}
            placeholder="Select a language"
            className="language-select"
        />
    );
};

export default LanguageDropdown;
