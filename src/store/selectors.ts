import { State } from './store.types';

export const getFiles = (state: State) => Object.values(state.files);
