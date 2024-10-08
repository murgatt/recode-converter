import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema, subtitleSchema } from 'schema';
import { formatFileObject, getSettingsFromStorage } from 'src/utils';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Store } from './store.types';

const { theme } = getSettingsFromStorage();

export const useStore = create<Store>()(
  immer(set => ({
    conversionSettings: {
      codec: codecSchema.enum.default,
      bitrate: bitrateSchema.enum.default,
      sampleRate: sampleRateSchema.enum.default,
      channels: channelsSchema.enum.default,
      subtitle: subtitleSchema.enum.default,
    },
    destinationPath: '',
    files: {},
    isConversionRunning: false,
    theme,
    addFiles: files => {
      set(state => {
        files.forEach(file => {
          const filePath = window.electron.getFilePath(file);
          state.files[filePath] = formatFileObject(file, filePath);
          window.conversion.getMetadata({ filePath });
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
    setFileFfmpegCommand: (filePath, ffmpegCommand) => {
      set(state => {
        state.files[filePath].ffmpegCommand = ffmpegCommand;
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
    setConversionSettings: conversionSettings => {
      set(state => {
        state.conversionSettings = conversionSettings;
      });
    },
  })),
);
