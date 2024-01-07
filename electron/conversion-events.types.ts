import type { IpcRendererEvent } from 'electron';
import type { FfprobeData } from 'fluent-ffmpeg';

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

export type FileMetadataCallback = (
  event: IpcRendererEvent,
  { filePath, metadata }: { filePath: string; metadata: FfprobeData },
) => void;
