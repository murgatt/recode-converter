import { fileStatusSchema } from 'schema';
import type { State } from './store.types';

export const getFiles = (state: State) => Object.values(state.files);
export const getFilesToConvert = (state: State) =>
  Object.values(state.files).filter(file => file.status === fileStatusSchema.enum.imported);
export const getDestinationPath = (state: State) => state.destinationPath;
export const getIsConversionRunning = (state: State) => state.isConversionRunning;
