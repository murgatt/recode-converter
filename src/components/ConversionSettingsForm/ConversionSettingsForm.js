import React from 'react';
import { useSelector } from 'react-redux';
import CodeSelect from '../CodecSelect';
import BitrateSelect from '../BitrateSelect';
import { getSingleConversionSetting } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS } from '../../store/conversionSettings/conversionSettings.actions';

const ConversionSettingsForm = () => {
    const codec = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioCodec));
    const audioSettingsDisabled = codec === 'passthru' || codec === 'none';

    return (
        <div>
            <CodeSelect />
            <BitrateSelect codec={codec} disabled={audioSettingsDisabled} />
        </div>
    );
};

export default ConversionSettingsForm;
