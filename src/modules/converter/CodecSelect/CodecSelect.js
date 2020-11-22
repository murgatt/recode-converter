import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../components/Select';
import codecSetting from '../../../config/conversion/audio/codec';
import { getSingleConversionSetting } from '../../../store/conversionSettings/conversionSettings.selectors';
import {
    resetConversionSettings,
    setConversionSetting,
} from '../../../store/conversionSettings/conversionSettings.actions';
import { CONVERSION_SETTINGS } from '../../../store/conversionSettings/conversionSettings.constants';

const CodeSelect = () => {
    const dispatch = useDispatch();
    const codec = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioCodec));
    const { label, options } = codecSetting;

    const handleChange = useCallback(
        value => {
            dispatch(resetConversionSettings);
            dispatch(setConversionSetting(CONVERSION_SETTINGS.audioCodec, value));
        },
        [dispatch],
    );

    return (
        <Select fullWidth label={label} onChange={handleChange} options={options} value={codec} variant="outlined" />
    );
};

export default CodeSelect;
