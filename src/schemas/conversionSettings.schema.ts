import { z } from 'zod';

export const codecSchema = z.enum(['default', 'aac', 'ac3', 'eac3']);
export type Codec = z.infer<typeof codecSchema>;

export const bitrateSchema = z.enum([
  'default',
  '32k',
  '64k',
  '96k',
  '128k',
  '192k',
  '256k',
  '320k',
  '384k',
  '448k',
  '512k',
  '640k',
  '1024k',
  '2048k',
  '4096k',
]);
export type Bitrate = z.infer<typeof bitrateSchema>;

export const sampleRateSchema = z.enum(['default', '8000', '22050', '32000', '44100', '48000', '96000']);
export type SampleRate = z.infer<typeof sampleRateSchema>;

export const channelsSchema = z.enum(['default', '1', '2', '3', '4', '5', '6', '7', '8']);
export type Channels = z.infer<typeof channelsSchema>;
