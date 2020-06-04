import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash-es';
import { TextField, makeStyles } from '@material-ui/core';
import { setStreamMetadata } from '../../store/file/file.actions';

const useStyles = makeStyles({
    textField: {
        minWidth: 120,
    },
});

const StreamMetadataInput = ({ filePath, name, stream, streamsMetadata }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const newMetadata = streamsMetadata.find(streamMetadata => {
        return streamMetadata.index === stream.index && streamMetadata.key === name;
    });

    const inputValue = useMemo(() => {
        return _.get(newMetadata, 'value', stream.tags[name]);
    }, [name, newMetadata, stream.tags]);

    const handleMetadataChange = useCallback(
        streamIndex => event => {
            const { value } = event.target;
            dispatch(setStreamMetadata(filePath, streamIndex, name, value));
        },
        [dispatch, filePath, name],
    );

    return (
        <TextField
            className={classes.textField}
            onChange={handleMetadataChange(stream.index)}
            name={name}
            size="small"
            value={inputValue}
            variant="outlined"
        />
    );
};

StreamMetadataInput.propTypes = {
    filePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stream: PropTypes.object.isRequired,
    streamsMetadata: PropTypes.array.isRequired,
};

export default StreamMetadataInput;
