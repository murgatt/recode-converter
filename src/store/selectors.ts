import type { State } from './store.types';

export const getFiles = (state: State) => Object.values(state.files);
export const getDestinationPath = (state: State) => state.destinationPath;
