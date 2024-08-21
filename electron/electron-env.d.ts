import type {
  ConversionEndCallback,
  FileConversionEndCallback,
  FileConversionErrorCallback,
  FileConversionProgressCallback,
  FileConversionStartCallback,
  FileMetadataCallback,
} from './conversion-events.types';
import type { ConversionSettings, VideoFile } from '../schema';

export interface IElectron {
  getFilePath: (file: File) => string;
  openDirectory: () => Promise<string>;
  openExternalLink: (url: string) => Promise<void>;
}

export interface IConversion {
  getMetadata: ({ filePath }: { filePath: string }) => void;
  onConversionEnd: (callback: ConversionEndCallback) => void;
  onFileConversionEnd: (callback: FileConversionEndCallback) => void;
  onFileConversionError: (callback: FileConversionErrorCallback) => void;
  onFileConversionProgress: (callback: FileConversionProgressCallback) => void;
  onFileConversionStart: (callback: FileConversionStartCallback) => void;
  onFileMetadata: (callback: FileMetadataCallback) => void;
  startConversion: ({
    conversionSettings,
    destinationPath,
    files,
  }: {
    conversionSettings: ConversionSettings;
    destinationPath: string;
    files: VideoFile[];
  }) => void;
  stopConversion: () => void;
}

declare global {
  interface Window {
    conversion: IConversion;
    electron: IElectron;
  }
}
