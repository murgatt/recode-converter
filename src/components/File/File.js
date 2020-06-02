import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Collapse,
    LinearProgress,
    makeStyles,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import VideoIcon from '@material-ui/icons/MovieOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import IconButton from '../IconButton';
import { FILE_STATUS } from '../../store/file/file.constants';
import { getIsConversionRunning } from '../../store/conversion/conversion.selectors';
import { formatFileSize } from '../../store/file/file.utils';
import FileStreams from '../FileStreams';

const useStyles = makeStyles(theme => ({
    cardContent: {
        marginBottom: theme.spacing(2),
    },
    expandButton: {
        bottom: 4,
        left: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'absolute',
        right: 0,
        transform: props => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)'),
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    file: {
        '&:last-child': {
            marginBottom: 0,
        },
        marginBottom: theme.spacing(),
        position: 'relative',
    },
    progressWrapper: {
        height: 4,
    },
    successIcon: {
        color: theme.palette.success.main,
    },
}));

const File = ({ file, onDeleteFile }) => {
    const { name, progress, size, status } = file;
    const [expanded, setExpanded] = useState(false);
    const classes = useStyles({ expanded });
    const { t } = useTranslation();
    const isConverting = status === FILE_STATUS.converting;
    const isConversionRunning = useSelector(getIsConversionRunning);
    const deleteActionIsDisabled = isConverting || isConversionRunning;
    const fileSize = useMemo(() => formatFileSize(size), [size]);

    const icon = useMemo(() => {
        switch (status) {
            case FILE_STATUS.complete:
                return <CheckIcon className={classes.successIcon} />;
            case FILE_STATUS.converting:
                return <CircularProgress size={24} />;
            case FILE_STATUS.error:
                return <ErrorIcon color="error" />;
            default:
                return <VideoIcon color="action" />;
        }
    }, [classes.successIcon, status]);

    const handleExpandClick = useCallback(() => setExpanded(!expanded), [expanded]);

    const deleteAction = (
        <IconButton disabled={deleteActionIsDisabled} label={t('removeFile')} onClick={onDeleteFile}>
            <DeleteIcon />
        </IconButton>
    );

    return (
        <Card className={classes.file} variant="outlined">
            <CardHeader action={deleteAction} avatar={icon} title={name} subheader={fileSize} />
            <IconButton className={classes.expandButton} onClick={handleExpandClick} size="small">
                <ExpandIcon />
            </IconButton>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent className={classes.cardContent}>
                    <FileStreams file={file} />
                </CardContent>
            </Collapse>
            <div className={classes.progressWrapper}>
                {isConverting && <LinearProgress value={progress} variant="determinate" />}
            </div>
        </Card>
    );
};

File.propTypes = {
    file: PropTypes.object.isRequired,
    onDeleteFile: PropTypes.func.isRequired,
};

export default File;
