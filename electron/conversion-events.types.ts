import type { IpcRendererEvent } from 'electron';

export type FileConversionStartCallback = (event: IpcRendererEvent, { filePath }: { filePath: string }) => void;

export type FileConversionProgressCallback = (
  event: IpcRendererEvent,
  { filePath, progress }: { filePath: string; progress: number },
) => void;

export type FileConversionEndCallback = (event: IpcRendererEvent, { filePath }: { filePath: string }) => void;

export type FileConversionErrorCallback = (
  event: IpcRendererEvent,
  { filePath, error }: { error: string; filePath: string },
) => void;
