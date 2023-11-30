import type {
  FileConversionEndCallback,
  FileConversionErrorCallback,
  FileConversionProgressCallback,
  FileConversionStartCallback,
} from './conversion.types';
import type { VideoFile } from '../src/types/file.types';

declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string;
    VITE_PUBLIC: string;
  }
}

export interface IElectronAPI {
  openDirectory: () => Promise<string>;
}

export interface IConversion {
  onFileConversionEnd: (callback: FileConversionEndCallback) => void;
  onFileConversionError: (callback: FileConversionErrorCallback) => void;
  onFileConversionProgress: (callback: FileConversionProgressCallback) => void;
  onFileConversionStart: (callback: FileConversionStartCallback) => void;
  startConversion: ({ files }: { files: VideoFile[] }) => void;
}

declare global {
  interface Window {
    conversion: IConversion;
    electronAPI: IElectronAPI;
  }
}
