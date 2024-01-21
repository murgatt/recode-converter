import fs from 'node:fs';
import path from 'node:path';
import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema, subtitleSchema } from '../../schema';
import type { ConversionSettings, StreamsTitle, StreamsToCopy } from '../../schema';

const baseOutputOptions = ['-map 0', '-codec copy'];
const audioCodecFlag = '-c:a';
const audioBitrateFlag = '-b:a';
const audioChannelsFlag = '-ac';
const audioSampleRateFlag = '-ar';
const subtitleCodecFlag = '-c:s';

export function getOutputOptions({ bitrate, channels, codec, sampleRate, subtitle }: ConversionSettings) {
  const options = [...baseOutputOptions];

  if (codec && codec !== codecSchema.enum.default) {
    options.push(`${audioCodecFlag} ${codec}`);
  }

  if (bitrate && bitrate !== bitrateSchema.enum.default) {
    options.push(`${audioBitrateFlag} ${bitrate}`);
  }

  if (channels && channels !== channelsSchema.enum.default) {
    options.push(`${audioChannelsFlag} ${channels}`);
  }

  if (sampleRate && sampleRate !== sampleRateSchema.enum.default) {
    options.push(`${audioSampleRateFlag} ${sampleRate}`);
  }

  if (subtitle && subtitle !== subtitleSchema.enum.default) {
    options.push(`${subtitleCodecFlag} ${subtitle}`);
  }

  return options;
}

export function getOutputPath(inputPath: string, destinationPath: string) {
  const { base, dir, ext, name } = path.parse(inputPath);
  const outputDirectory = destinationPath || dir;

  let index = 1;
  let outputPath = path.join(outputDirectory, base);

  while (fs.existsSync(outputPath)) {
    outputPath = path.join(outputDirectory, `${name} (${index})${ext}`);
    index++;
  }

  return outputPath;
}

export function getIgnoredStreamsOptions(streamsToCopy: StreamsToCopy) {
  return Object.entries(streamsToCopy)
    .filter(([, shouldCopy]) => !shouldCopy)
    .map(([streamIndex]) => `-map -0:${streamIndex}`);
}

export function getStreamsTitleOptions(streamsTitle: StreamsTitle) {
  const options: string[] = [];

  Object.entries(streamsTitle).forEach(([streamIndex, streamTitle]) => {
    // We need 2 entries (1 for flag, 1 for value) for each stream to ignore otherwise ffmpeg command throws an error
    // This why we don't use a map and we need to push 2 entries even if the final command is identical
    options.push(`-metadata:s:${streamIndex}`, `title=${streamTitle}`);
  });

  return options;
}
