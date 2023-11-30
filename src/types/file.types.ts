import { z } from 'zod';

export const fileStatusSchema = z.enum(['imported', 'converting', 'conversionSuccess', 'conversionError']);
export type FileStatus = z.infer<typeof fileStatusSchema>;

export type VideoFile = {
  name: string;
  path: string;
  progress: number;
  size: number;
  status: FileStatus;
  type: string;
};
