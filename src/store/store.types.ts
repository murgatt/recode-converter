import type { FfprobeData } from 'fluent-ffmpeg';
import type { FileStatus, VideoFile } from 'schema';

export type State = {
  destinationPath: string;
  files: Record<string, VideoFile>;
};

export type Actions = {
  addFiles: (files: File[]) => void;
  clearFiles: () => void;
  removeFile: (filePath: string) => void;
  setDestinationPath: (destinationPath: string) => void;
  setFileMetadata: (filePath: string, metadata: FfprobeData) => void;
  setFileProgress: (filePath: string, progress: number) => void;
  setFileStatus: (filePath: string, status: FileStatus) => void;
};

export type Store = State & Actions;
