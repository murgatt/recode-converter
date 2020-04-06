/* eslint-disable import/prefer-default-export */

import { CONVERSION_STATUS } from './conversion.constants';

export const getIsConversionRunning = ({ conversion }) => conversion.status === CONVERSION_STATUS.converting;
