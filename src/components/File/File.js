import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';

const File = ({ file }) => {
    const { name, path } = file;
    return (
        <ListItem>
            <ListItemText secondary={path}>{name}</ListItemText>
        </ListItem>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
};

export default File;
