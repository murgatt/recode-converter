import fs from 'node:fs';
import path from 'node:path';
import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema } from '../../schema';
import type { ConversionSettings } from '../../schema';

const baseOutputOptions = ['-map 0', '-codec copy'];
const audioCodecFlag = '-c:a';
const audioBitrateFlag = '-c:a';
const audioChannelsFlag = '-ac';
const audioSampleReteFlag = '-ar';

export function getOutputOptions({ bitrate, channels, codec, sampleRate }: ConversionSettings) {
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
    options.push(`${audioSampleReteFlag} ${sampleRate}`);
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
