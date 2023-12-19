/// <reference types="fluent-ffmpeg" />
import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema } from '../schema';
import type { ConversionSettings, VideoFile } from '../schema';

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const baseOutputOptions = ['-map 0', '-codec copy'];
const audioCodecFlag = '-c:a';
const audioBitrateFlag = '-c:a';
const audioChannelsFlag = '-ac';
const audioSampleReteFlag = '-ar';

function getOutputOptions({ bitrate, channels, codec, sampleRate }: ConversionSettings) {
  const options = [...baseOutputOptions];

  if (codec !== codecSchema.enum.default) {
    options.push(`${audioCodecFlag} ${codec}`);
  }

  if (bitrate !== bitrateSchema.enum.default) {
    options.push(`${audioBitrateFlag} ${bitrate}`);
  }

  if (channels !== channelsSchema.enum.default) {
    options.push(`${audioChannelsFlag} ${channels}`);
  }

  if (sampleRate !== sampleRateSchema.enum.default) {
    options.push(`${audioSampleReteFlag} ${sampleRate}`);
  }

  return options;
}

type ConvertParams = {
  conversionSettings: ConversionSettings;
  destination: string;
  file: VideoFile;
};

type ConvertCallbacks = {
  onFileConversionEnd: (filePath: string) => void;
  onFileConversionError: (filePath: string, error: string) => void;
  onFileConversionProgress: (filePath: string, progress: number) => void;
  onFileConversionStart: (filePath: string, commandLine: string) => void;
};

export function convert(
  { conversionSettings, file, destination }: ConvertParams,
  { onFileConversionEnd, onFileConversionError, onFileConversionProgress, onFileConversionStart }: ConvertCallbacks,
) {
  const inputPath = file.path;
  const outputPath = '/Users/theo/Downloads/test.mkv';
  const outputOptions = getOutputOptions(conversionSettings);

  const command = ffmpeg().input(inputPath).output(outputPath).outputOptions(outputOptions);

  return new Promise<void>((resolve, reject) => {
    command
      .on('start', (commandLine: string) => {
        console.log(commandLine);
        onFileConversionStart(inputPath, commandLine);
      })
      .on('progress', progress => {
        onFileConversionProgress(inputPath, 30);
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
