import type {
  FileConversionEndCallback,
  FileConversionErrorCallback,
  FileConversionProgressCallback,
  FileConversionStartCallback,
  FileMetadataCallback,
} from './conversion-events.types';
import type { ConversionSettings, VideoFile } from '../schema';

export interface IDialog {
  openDirectory: () => Promise<string>;
}

export interface IConversion {
  getMetadata: ({ filePath }: { filePath: string }) => void;
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
    dialog: IDialog;
  }
}
