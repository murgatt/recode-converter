import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Tooltip } from '@material-ui/core';
import AudioIcon from '@material-ui/icons/AudiotrackOutlined';
import SubtitlesIcon from '@material-ui/icons/SubtitlesOutlined';
import VideoIcon from '@material-ui/icons/MovieOutlined';
import { makeStyles } from '@material-ui/core/styles';
import i18n from '../../i18n';
import { addStreamToIgnore, removeStreamToIgnore } from '../../store/file/file.actions';
import { FILE_STATUS } from '../../store/file/file.constants';
import StreamMetadataInput from '../StreamMetadataInput';

const useStyles = makeStyles({
    codec: {
        textTransform: 'uppercase',
    },
});

const codecTypeIcons = {
    audio: (
        <Tooltip title={i18n.t('audio')}>
            <AudioIcon />
        </Tooltip>
    ),
    subtitle: (
        <Tooltip title={i18n.t('subtitles')}>
            <SubtitlesIcon />
        </Tooltip>
    ),
    video: (
        <Tooltip title={i18n.t('video')}>
            <VideoIcon />
        </Tooltip>
    ),
};

const getStreamProperties = stream => {
    const { bit_rate: bitRate, channels, codec_type: codecType, height, sample_rate: sampleRate, width } = stream;
    switch (codecType) {
        case 'audio':
            return `${i18n.t('channel', { count: channels })}, ${
                bitRate ? `${bitRate / 1000} kbps,` : ''
            } ${sampleRate} Hz`;
        case 'video':
            return `${width}x${height}`;
        default:
            return '';
    }
};

const FileStreams = ({ file }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const { ignoredStreams, path, status, streams, streamsMetadata } = file;
    const isEditDisabled = status === FILE_STATUS.converting || status === FILE_STATUS.complete;

    const handleCheckChange = useCallback(
        streamIndex => event => {
            const { checked } = event.target;
            if (checked) {
                dispatch(removeStreamToIgnore(path, streamIndex));
            } else {
                dispatch(addStreamToIgnore(path, streamIndex));
            }
        },
        [dispatch, path],
    );

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>{t('file.copyStream.title')}</TableCell>
                    <TableCell>{t('conversionSettings.codec')}</TableCell>
                    <TableCell>{t('type')}</TableCell>
                    <TableCell>{t('language')}</TableCell>
                    <TableCell>{t('title')}</TableCell>
                    <TableCell>{t('properties')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {streams.map(stream => (
                    <TableRow key={stream.index}>
                        <TableCell padding="checkbox">
                            <Tooltip title={t('file.copyStream.description')}>
                                <Checkbox
                                    checked={!ignoredStreams.includes(stream.index)}
                                    disabled={isEditDisabled}
                                    onChange={handleCheckChange(stream.index)}
                                />
                            </Tooltip>
                        </TableCell>
                        <TableCell className={classes.codec}>{stream.codec_name}</TableCell>
                        <TableCell>{codecTypeIcons[stream.codec_type]}</TableCell>
                        <TableCell>{stream.tags.language}</TableCell>
                        <TableCell>
                            <StreamMetadataInput
                                filePath={path}
                                name="title"
                                stream={stream}
                                streamsMetadata={streamsMetadata}
                            />
                        </TableCell>
                        <TableCell>{getStreamProperties(stream)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

FileStreams.propTypes = {
    file: PropTypes.object.isRequired,
};

export default FileStreams;
