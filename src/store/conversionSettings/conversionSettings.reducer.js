import { CONVERSION_SETTINGS, SET_CONVERSION_SETTING } from './conversionSettings.actions';

const initialState = {
    [CONVERSION_SETTINGS.audioBitrate]: '',
    [CONVERSION_SETTINGS.audioCodec]: 'passthru',
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
