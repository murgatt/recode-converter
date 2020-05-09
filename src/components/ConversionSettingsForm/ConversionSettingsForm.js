import React from 'react';
import { useSelector } from 'react-redux';
import CodeSelect from '../CodecSelect';
import BitrateSelect from '../BitrateSelect';
import SampleRateSelect from '../SampleRateSelect';
import ChannelsSelect from '../ChannelsSelect';
import FormGroup from '../FormGroup';
import { getSingleConversionSetting } from '../../store/conversionSettings/conversionSettings.selectors';
import { CONVERSION_SETTINGS } from '../../store/conversionSettings/conversionSettings.actions';

const ConversionSettingsForm = () => {
    const codec = useSelector(getSingleConversionSetting(CONVERSION_SETTINGS.audioCodec));
    const audioSettingsDisabled = codec === 'passthru' || codec === 'none';
    // TODO: should be deleted when a fix is available for dts channels
    const isChannelsDisabled = codec === 'dts';

    return (
        <FormGroup>
            <CodeSelect />
            <BitrateSelect codec={codec} disabled={audioSettingsDisabled} />
            <SampleRateSelect codec={codec} disabled={audioSettingsDisabled} />
            <ChannelsSelect codec={codec} disabled={audioSettingsDisabled || isChannelsDisabled} />
        </FormGroup>
    );
};

export default ConversionSettingsForm;
