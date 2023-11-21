import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Store } from './store.types';

export const useStore = create<Store>()(
  immer(set => ({
    files: {},
    addFiles: (files: File[]) => {
      set(state => files.forEach(file => (state.files[file.path] = file)));
    },
    removeFile: (filePath: string) => {
      set(state => {
        delete state.files[filePath];
      });
    },
    clearFiles: () => {
      set(state => {
        state.files = {};
      });
    },
  })),
);
