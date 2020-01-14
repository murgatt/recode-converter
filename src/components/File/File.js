import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { CardHeader, IconButton, makeStyles } from '@material-ui/core';
import VideoIcon from '@material-ui/icons/Movie';
import StartIcon from '@material-ui/icons/PlayArrow';

const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles(theme => ({
    file: {
        '&:last-child': {
            marginBottom: 0,
        },
        marginBottom: theme.spacing(),
    },
}));

const File = ({ file }) => {
    const { name, path } = file;
    const classes = useStyles();

    const handleElectronTest = () => {
        const res = ipcRenderer.sendSync('ffmpeg-convert', path);
        console.log(res);
    };

    return (
        <Card className={classes.file} variant="outlined">
            <CardHeader
                action={
                    <IconButton onClick={handleElectronTest}>
                        <StartIcon />
                    </IconButton>
                }
                avatar={<VideoIcon color="action" />}
                title={name}
                subheader={path}
            />
        </Card>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
};

export default File;
