import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash-es';
import Select from '../Select';
import { bitrate as bitrateSetting } from '../../config/conversion/audioSettings';
import { getSingleConversionSetting } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS, setConversionSetting } from '../../store/conversionSettings/conversionSettings.actions';

const BitrateSelect = ({ codec, disabled }) => {
    const dispatch = useDispatch();
    const bitrate = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioBitrate));
    const { label } = bitrateSetting;
    const displayedValue = disabled ? '' : bitrate;
    const options = disabled ? [] : _.get(bitrateSetting, [codec, 'options'], []);

    const handleChange = useCallback(
        value => dispatch(setConversionSetting(CONVERSION_SETTINGS.audioBitrate, value)),
        [],
    );

    return (
        <Select
            disabled={disabled}
            fullWidth
            label={label}
            onChange={handleChange}
            options={options}
            variant="outlined"
            value={displayedValue}
        />
    );
};

BitrateSelect.propTypes = {
    codec: PropTypes.string,
    disabled: PropTypes.bool,
};

BitrateSelect.defaultProps = {
    codec: '',
    disabled: false,
};

export default BitrateSelect;
