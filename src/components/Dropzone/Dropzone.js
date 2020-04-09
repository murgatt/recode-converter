import React from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
    dropzone: {
        alignItems: 'center',
        backgroundColor: props => (props.isDragActive ? theme.palette.action.hover : 'transparent'),
        border: props => (props.isDragActive ? `2px dashed ${theme.palette.divider}` : 'none'),
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    dropzoneWrapper: {
        height: '100%',
        padding: theme.spacing(2),
        width: '100%',
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
        <div className={classes.dropzoneWrapper}>
            <div {...getRootProps({ className })}>
                <input {...getInputProps()} />
                {children}
            </div>
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
