import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, LinearProgress, makeStyles } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import LoadIcon from '@material-ui/icons/Loop';
import VideoIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles(theme => ({
    file: {
        '&:last-child': {
            marginBottom: 0,
        },
        marginBottom: theme.spacing(),
    },
    progressWrapper: {
        height: 4,
    },
}));

const File = ({ file }) => {
    const { name, path, progress, status } = file;
    const classes = useStyles();

    const icon = useMemo(() => {
        switch (status) {
            case 'complete':
                return <CheckIcon />;
            case 'conversion':
                return <LoadIcon />;
            case 'error':
                return <ErrorIcon color="error" />;
            default:
                return <VideoIcon color="action" />;
        }
    }, [status]);

    return (
        <Card className={classes.file} variant="outlined">
            <CardHeader avatar={icon} title={name} subheader={path} />
            <div className={classes.progressWrapper}>
                {status === 'conversion' && <LinearProgress value={progress} variant="determinate" />}
            </div>
        </Card>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
};

export default File;
