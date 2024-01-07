/// <reference types="fluent-ffmpeg" />
import type { FfprobeData } from 'fluent-ffmpeg';

const ffprobePath = require('@ffprobe-installer/ffprobe').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfprobePath(ffprobePath);

export function getMetadata(filePath: string) {
  return new Promise<FfprobeData>((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (error: unknown, metadata: FfprobeData) => {
      if (error) {
        reject(error);
      }

      resolve(metadata);
    });
  });
}
