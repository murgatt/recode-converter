export const SET_CONVERSION_SETTING = 'conversionSettings/SET_CONVERSION_SETTING';
export const RESET_CONVERSION_SETTINGS = 'conversionSettings/RESET_CONVERSION_SETTINGS';

export const resetConversionSettings = dispatch => dispatch({ type: RESET_CONVERSION_SETTINGS });
export const setConversionSetting = (settingName, settingValue) => dispatch =>
    dispatch({ settingName, settingValue, type: SET_CONVERSION_SETTING });
