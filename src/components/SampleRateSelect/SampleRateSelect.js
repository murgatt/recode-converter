import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash-es';
import Select from '../Select';
import sampleRateSetting from '../../config/conversion/audio/samplerate';
import { getSingleConversionSetting } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS, setConversionSetting } from '../../store/conversionSettings/conversionSettings.actions';

const SampleRateSelect = ({ codec, disabled }) => {
    const dispatch = useDispatch();
    const sampleRate = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioSampleRate));
    const { label } = sampleRateSetting;
    const displayedValue = disabled ? '' : sampleRate;
    const options = disabled ? [] : _.get(sampleRateSetting, [codec, 'options'], []);

    const handleChange = useCallback(
        value => dispatch(setConversionSetting(CONVERSION_SETTINGS.audioSampleRate, value)),
        [dispatch],
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

SampleRateSelect.propTypes = {
    codec: PropTypes.string,
    disabled: PropTypes.bool,
};

SampleRateSelect.defaultProps = {
    codec: '',
    disabled: false,
};

export default SampleRateSelect;
