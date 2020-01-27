import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../Select';
import { bitrate as bitrateSetting } from '../../config/conversion/audioSettings';
import { getConversionSettings } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS, setConversionSetting } from '../../store/conversionSettings/conversionSettings.actions';

const BitrateSelect = ({ codec, disabled }) => {
    const dispatch = useDispatch();
    const bitrate = useSelector(getConversionSettings(CONVERSION_SETTINGS.audioBitrate));
    const { label } = bitrateSetting;
    const options = codec === 'passthru' ? [] : bitrateSetting[codec].options;

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
            value={bitrate}
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
