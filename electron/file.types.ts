export type VideoFile = {
  name: string;
  path: string;
  progress: number;
  size: number;
  status: 'imported' | 'converting' | 'conversionSuccess' | 'conversionError';
  type: string;
};
