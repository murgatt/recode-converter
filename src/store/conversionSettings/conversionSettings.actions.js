export const SET_CONVERSION_SETTING = 'conversionSettings/SET_CONVERSION_SETTING';

export const CONVERSION_SETTINGS = {
    audioBitrate: 'audioBitrate',
    audioCodec: 'audioCodec',
};

export const setConversionSetting = (settingName, settingValue) => dispatch =>
    dispatch({ settingName, settingValue, type: SET_CONVERSION_SETTING });
