/// <reference types="fluent-ffmpeg" />
import ffmpeg from 'fluent-ffmpeg';
import {
  getIgnoredStreamsIndex,
  getIgnoredStreamsOptions,
  getOutputOptions,
  getOutputPath,
  getStreamsTitleOptions,
} from './convert.utils';
import type { ConversionSettings, VideoFile } from '../../schema';
import type { ProgressInfo } from 'electron-builder';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path.replace('app.asar', 'app.asar.unpacked');

ffmpeg.setFfmpegPath(ffmpegPath);

type ConvertParams = {
  conversionSettings: ConversionSettings;
  destinationPath: string;
  file: VideoFile;
};

type ConvertCallbacks = {
  onFileConversionEnd: (filePath: string) => void;
  onFileConversionError: (filePath: string, error: string) => void;
  onFileConversionProgress: (filePath: string, progress: number) => void;
  onFileConversionStart: (filePath: string, commandLine: string) => void;
};

export function convert(
  { conversionSettings, file, destinationPath }: ConvertParams,
  { onFileConversionEnd, onFileConversionError, onFileConversionProgress, onFileConversionStart }: ConvertCallbacks,
) {
  const inputPath = file.path;
  const outputPath = getOutputPath(inputPath, destinationPath);
  const outputOptions = getOutputOptions(conversionSettings);
  const ignoredStreamsIndex = getIgnoredStreamsIndex(file.streamsToCopy);
  const ignoredStreamsOptions = getIgnoredStreamsOptions(ignoredStreamsIndex);
  const streamsTitleOptions = getStreamsTitleOptions(file.streamsTitle, ignoredStreamsIndex);

  const command = ffmpeg()
    .input(inputPath)
    .output(outputPath)
    .outputOptions(outputOptions)
    .outputOptions(ignoredStreamsOptions)
    // @ts-ignore - Workaround to avoid error when there is spaces in stream title
    .outputOptions(...streamsTitleOptions);

  return new Promise<void>((resolve, reject) => {
    command
      .on('start', (commandLine: string) => {
        // eslint-disable-next-line no-console
        console.log(commandLine);
        onFileConversionStart(inputPath, commandLine);
      })
      .on('progress', ({ percent }: ProgressInfo) => {
        onFileConversionProgress(inputPath, percent ?? 0);
      })
      .on('end', () => {
        onFileConversionEnd(inputPath);
        resolve();
      })
      .on('error', (error: Error) => {
        onFileConversionError(inputPath, error.message);
        reject(error);
      });

    command.run();
  });
}
