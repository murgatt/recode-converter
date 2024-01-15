import type { FfprobeData } from 'fluent-ffmpeg';
import type { FileStatus, StreamsTitle, StreamsToCopy, VideoFile } from 'schema';

export type State = {
  destinationPath: string;
  files: Record<string, VideoFile>;
  isConversionRunning: boolean;
};

export type Actions = {
  addFiles: (files: File[]) => void;
  clearFiles: () => void;
  removeFile: (filePath: string) => void;
  setDestinationPath: (destinationPath: string) => void;
  setFileMetadata: (filePath: string, metadata: FfprobeData) => void;
  setFileProgress: (filePath: string, progress: number) => void;
  setFileStatus: (filePath: string, status: FileStatus) => void;
  setIsConversionRunning: (isConversionRunning: boolean) => void;
  setStreamsTitle: (filePath: string, streamsTitle: StreamsTitle) => void;
  setStreamsToCopy: (filePath: string, streamsToCopy: StreamsToCopy) => void;
};

export type Store = State & Actions;
