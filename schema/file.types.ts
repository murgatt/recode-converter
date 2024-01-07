import { z } from 'zod';
import type { FfprobeData } from 'fluent-ffmpeg';

export const fileStatusSchema = z.enum(['imported', 'converting', 'conversionSuccess', 'conversionError']);
export type FileStatus = z.infer<typeof fileStatusSchema>;

export type VideoFile = {
  metadata?: FfprobeData;
  name: string;
  path: string;
  progress: number;
  size: number;
  status: FileStatus;
  type: string;
};
