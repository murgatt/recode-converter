import { formatFileObject } from 'src/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Store } from './store.types';
import type { FileStatus } from 'src/types/file.types';

export const useStore = create<Store>()(
  immer(set => ({
    destinationPath: '',
    files: {},
    addFiles: (files: File[]) => {
      set(state => files.forEach(file => (state.files[file.path] = formatFileObject(file))));
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
    setFileStatus: (filePath: string, status: FileStatus) => {
      set(state => {
        state.files[filePath].status = status;
      });
    },
    setFileProgress: (filePath: string, progress: number) => {
      set(state => {
        state.files[filePath].progress = progress;
      });
    },
    setDestinationPath: (destinationPath: string) => {
      set(state => {
        state.destinationPath = destinationPath;
      });
    },
  })),
);
