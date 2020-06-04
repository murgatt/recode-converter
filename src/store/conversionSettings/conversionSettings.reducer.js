import { RESET_CONVERSION_SETTINGS, SET_CONVERSION_SETTING } from './conversionSettings.actions';
import { CONVERSION_SETTINGS } from './conversionSettings.constants';
import { bitrate, channels, codec, sampleRate } from '../../config/conversion/audio';

const initialState = {
    [CONVERSION_SETTINGS.audioBitrate]: bitrate.defaultValue,
    [CONVERSION_SETTINGS.audioChannels]: channels.defaultValue,
    [CONVERSION_SETTINGS.audioCodec]: codec.defaultValue,
    [CONVERSION_SETTINGS.audioSampleRate]: sampleRate.defaultValue,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case RESET_CONVERSION_SETTINGS:
            return initialState;
        case SET_CONVERSION_SETTING:
            return {
                ...state,
                [action.settingName]: action.settingValue,
            };
        default:
            return state;
    }
};
