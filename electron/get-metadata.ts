/// <reference types="fluent-ffmpeg" />
import ffmpeg from 'fluent-ffmpeg';
import type { FfprobeData } from 'fluent-ffmpeg';

const ffprobePath = require('@ffprobe-installer/ffprobe').path.replace('app.asar', 'app.asar.unpacked');

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
