import { contextBridge, ipcRenderer } from 'electron';
import type { IConversion } from './electron-env';

contextBridge.exposeInMainWorld('dialog', {
  openDirectory: () => ipcRenderer.invoke('dialog:openDirectory'),
});

contextBridge.exposeInMainWorld('conversion', {
  getMetadata: ({ filePath }) => ipcRenderer.invoke('get-metadata', { filePath }),
  onConversionEnd: callback => ipcRenderer.on('conversion-end', callback),
  onFileConversionEnd: callback => ipcRenderer.on('file-conversion-end', callback),
  onFileConversionError: callback => ipcRenderer.on('file-conversion-error', callback),
  onFileConversionProgress: callback => ipcRenderer.on('file-conversion-progress', callback),
  onFileConversionStart: callback => ipcRenderer.on('file-conversion-start', callback),
  onFileMetadata: callback => ipcRenderer.on('file-metadata', callback),
  startConversion: ({ conversionSettings, destinationPath, files }) =>
    ipcRenderer.invoke('start-conversion', { conversionSettings, destinationPath, files }),
  stopConversion: () => ipcRenderer.invoke('stop-conversion'),
} as IConversion);
