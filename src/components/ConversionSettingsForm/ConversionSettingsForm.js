import React from 'react';
import { useSelector } from 'react-redux';
import CodeSelect from '../CodecSelect';
import BitrateSelect from '../BitrateSelect';
import { getConversionSettings } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS } from '../../store/conversionSettings/conversionSettings.actions';

const ConversionSettingsForm = () => {
    const codec = useSelector(getConversionSettings(CONVERSION_SETTINGS.audioCodec));
    const audioSettingsDisabled = codec === 'passthru';

    return (
        <div>
            <CodeSelect />
            <BitrateSelect codec={codec} disabled={audioSettingsDisabled} />
        </div>
    );
};

export default ConversionSettingsForm;
