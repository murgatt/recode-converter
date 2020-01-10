import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import StartIcon from '@material-ui/icons/PlayArrow';

const { ipcRenderer } = window.require('electron');

const File = ({ file }) => {
    const { name, path } = file;

    const handleElectronTest = () => {
        ipcRenderer.sendSync('ffmpeg-convert', path);
    };

    return (
        <ListItem>
            <ListItemText secondary={path}>{name}</ListItemText>
            <ListItemSecondaryAction>
                <IconButton onClick={handleElectronTest}>
                    <StartIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
};

export default File;
