import { CONVERSION_STATUS } from './conversion.constants';

export const getIsConversionPaused = ({ conversion }) => conversion.status === CONVERSION_STATUS.pause;
export const getIsConversionRunning = ({ conversion }) => conversion.status === CONVERSION_STATUS.converting;
