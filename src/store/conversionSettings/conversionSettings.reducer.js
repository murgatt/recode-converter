import { CONVERSION_SETTINGS, SET_CONVERSION_SETTING } from './conversionSettings.actions';
import { bitrate, codec, sampleRate } from '../../config/conversion/audio';

const initialState = {
    [CONVERSION_SETTINGS.audioBitrate]: bitrate.defaultValue,
    [CONVERSION_SETTINGS.audioCodec]: codec.defaultValue,
    [CONVERSION_SETTINGS.audioSampleRate]: sampleRate.defaultValue,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONVERSION_SETTING:
            return {
                ...state,
                [action.settingName]: action.settingValue,
            };
        default:
            return state;
    }
};
