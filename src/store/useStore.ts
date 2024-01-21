import { formatFileObject, getSettingsFromStorage } from 'src/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Store } from './store.types';

const { theme } = getSettingsFromStorage();

export const useStore = create<Store>()(
  immer(set => ({
    destinationPath: '',
    files: {},
    isConversionRunning: false,
    theme,
    addFiles: files => {
      set(state => {
        files.forEach(file => {
          state.files[file.path] = formatFileObject(file);
          window.conversion.getMetadata({ filePath: file.path });
        });
      });
    },
    removeFile: filePath => {
      set(state => {
        delete state.files[filePath];
      });
    },
    clearFiles: () => {
      set(state => {
        state.files = {};
      });
    },
    setFileStatus: (filePath, status) => {
      set(state => {
        state.files[filePath].status = status;
      });
    },
    setFileProgress: (filePath, progress) => {
      set(state => {
        state.files[filePath].progress = progress;
      });
    },
    setFileMetadata: (filePath, metadata) => {
      set(state => {
        state.files[filePath].metadata = metadata;
      });
    },
    setFileError: (filePath, error) => {
      set(state => {
        state.files[filePath].error = error;
      });
    },
    setStreamsTitle: (filePath, streamsTitle) => {
      set(state => {
        state.files[filePath].streamsTitle = streamsTitle;
      });
    },
    setStreamsToCopy: (filePath, streamsToCopy) => {
      set(state => {
        state.files[filePath].streamsToCopy = streamsToCopy;
      });
    },
    setDestinationPath: destinationPath => {
      set(state => {
        state.destinationPath = destinationPath;
      });
    },
    setIsConversionRunning: isConversionRunning => {
      set(state => {
        state.isConversionRunning = isConversionRunning;
      });
    },
    setTheme: themeSetting => {
      set(state => {
        state.theme = themeSetting;
      });
    },
  })),
);
