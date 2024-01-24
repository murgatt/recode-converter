import type { FfprobeData } from 'fluent-ffmpeg';
import type { ConversionSettings, FileStatus, StreamsTitle, StreamsToCopy, VideoFile } from 'schema';
import type { ThemeSetting } from 'src/schema/settings.schema';

export type State = {
  conversionSettings: ConversionSettings;
  destinationPath: string;
  files: Record<string, VideoFile>;
  isConversionRunning: boolean;
  theme: ThemeSetting;
};

export type Actions = {
  addFiles: (files: File[]) => void;
  clearFiles: () => void;
  removeFile: (filePath: string) => void;
  setConversionSettings: (conversionSettings: ConversionSettings) => void;
  setDestinationPath: (destinationPath: string) => void;
  setFileError: (filePath: string, error: string) => void;
  setFileFfmpegCommand: (filePath: string, ffmpegCommand: string) => void;
  setFileMetadata: (filePath: string, metadata: FfprobeData) => void;
  setFileProgress: (filePath: string, progress: number) => void;
  setFileStatus: (filePath: string, status: FileStatus) => void;
  setIsConversionRunning: (isConversionRunning: boolean) => void;
  setStreamsTitle: (filePath: string, streamsTitle: StreamsTitle) => void;
  setStreamsToCopy: (filePath: string, streamsToCopy: StreamsToCopy) => void;
  setTheme: (theme: ThemeSetting) => void;
};

export type Store = State & Actions;
