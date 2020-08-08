import { CONVERSION_STATUS } from './conversion.constants';

export const getIsConversionRunning = ({ conversion }) => conversion.status === CONVERSION_STATUS.converting;
export const getConversionList = ({ conversion }) => conversion.conversionList;
