import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ onChange }) => {
    const handleChange = useCallback(event => onChange(event.target.files, event), [onChange]);

    return <input accept="video/*,.mkv" multiple onChange={handleChange} type="file" style={{ display: 'none' }} />;
};

FileInput.propTypes = {
    onChange: PropTypes.func,
};

FileInput.defaultProps = {
    onChange: () => {},
};

export default FileInput;
