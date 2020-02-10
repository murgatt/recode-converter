/* eslint-disable import/prefer-default-export */

export const getConversionSettings = ({ conversionSettings }) => conversionSettings;
export const getSingleConversionSetting = settingName => ({ conversionSettings }) => conversionSettings[settingName];
