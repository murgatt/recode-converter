import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { Backdrop, makeStyles } from '@material-ui/core';
import FileIcon from '@material-ui/icons/FileCopyOutlined';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
    '@keyframes bounce': {
        from: { transform: 'translateY(0)' },
        to: { transform: `translateY(-${theme.spacing()}px)` },
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
    dropzone: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    dropzoneWrapper: {
        height: '100%',
        padding: theme.spacing(2),
        width: '100%',
    },
    fileIcon: {
        animation: '$bounce 0.35s ease infinite alternate',
        color: 'white',
        fontSize: 48,
    },
}));

const Dropzone = ({ children, onDrop }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'video/*,.mkv',
        noClick: true,
        onDropAccepted: onDrop,
    });
    const classes = useStyles({ isDragActive });
    const className = classNames('dropzone', classes.dropzone);

    return (
        <div {...getRootProps({ className })}>
            <input {...getInputProps()} />
            {children}
            <Backdrop ti className={classes.backdrop} open={isDragActive}>
                <FileIcon className={classes.fileIcon} color="inherit" fontSize="large" />
            </Backdrop>
        </div>
    );
};

Dropzone.propTypes = {
    children: PropTypes.node,
    onDrop: PropTypes.func,
};

Dropzone.defaultProps = {
    children: null,
    onDrop: () => {},
};

export default Dropzone;
