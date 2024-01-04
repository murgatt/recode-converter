import { contextBridge, ipcRenderer } from 'electron';
import type {
  FileConversionEndCallback,
  FileConversionErrorCallback,
  FileConversionProgressCallback,
  FileConversionStartCallback,
} from './conversion-events.types';
import type { ConversionSettings, VideoFile } from '../schema';

contextBridge.exposeInMainWorld('dialog', {
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
});

contextBridge.exposeInMainWorld('conversion', {
  onFileConversionEnd: (callback: FileConversionEndCallback) => ipcRenderer.on('file-conversion-end', callback),
  onFileConversionError: (callback: FileConversionErrorCallback) => ipcRenderer.on('file-conversion-error', callback),
  onFileConversionProgress: (callback: FileConversionProgressCallback) =>
    ipcRenderer.on('file-conversion-progress', callback),
  onFileConversionStart: (callback: FileConversionStartCallback) => ipcRenderer.on('file-conversion-start', callback),
  startConversion: ({
    conversionSettings,
    destinationPath,
    files,
  }: {
    conversionSettings: ConversionSettings;
    destinationPath: string;
    files: VideoFile[];
  }) => ipcRenderer.invoke('start-conversion', { conversionSettings, destinationPath, files }),
  stopConversion: () => ipcRenderer.invoke('stop-conversion'),
});
