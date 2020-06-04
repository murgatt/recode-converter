import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash-es';
import Select from '../Select';
import channelsSetting from '../../config/conversion/audio/channels';
import { getSingleConversionSetting } from '../../store/conversionSettings/conversionSettings.selectors';
import { setConversionSetting } from '../../store/conversionSettings/conversionSettings.actions';
import { CONVERSION_SETTINGS } from '../../store/conversionSettings/conversionSettings.constants';

const ChannelsSelect = ({ codec, disabled }) => {
    const dispatch = useDispatch();
    const channels = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioChannels));
    const { label } = channelsSetting;
    const displayedValue = disabled ? '' : channels;
    const options = disabled ? [] : _.get(channelsSetting, [codec, 'options'], []);

    const handleChange = useCallback(
        value => dispatch(setConversionSetting(CONVERSION_SETTINGS.audioChannels, value)),
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

ChannelsSelect.propTypes = {
    codec: PropTypes.string,
    disabled: PropTypes.bool,
};

ChannelsSelect.defaultProps = {
    codec: '',
    disabled: false,
};

export default ChannelsSelect;
