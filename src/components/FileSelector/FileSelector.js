import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const FileSelector = ({ onFilesSelected }) => {
    const handleChange = event => {
        onFilesSelected(event.target.files);
    };

    return (
        <Button color="primary" component="label" variant="outlined">
            Select files
            <input multiple onChange={handleChange} type="file" style={{ display: 'none' }} />
        </Button>
    );
};

FileSelector.propTypes = {
    onFilesSelected: PropTypes.func,
};

FileSelector.defaultProps = {
    onFilesSelected: () => {},
};

export default FileSelector;
