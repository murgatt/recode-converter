import type { VideoFile } from 'schema';

export function formatFileSize(fileSize: number): string {
  const base = 1024;
  const units = ['octets', 'Ko', 'Mo', 'Go', 'To'];

  let size = fileSize;
  let unitIndex = 0;

  while (size >= base && unitIndex < units.length - 1) {
    size /= base;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

export function getDirectoryPathFromFile(file: VideoFile) {
  return file.path.split('/').slice(0, -1).join('/');
}

export function areFilesFromSameDirectory(files: VideoFile[]) {
  return files.every(file => {
    return getDirectoryPathFromFile(file) === getDirectoryPathFromFile(files[0]);
  });
}

export function formatFileObject(file: File): VideoFile {
  return {
    name: file.name,
    path: file.path,
    progress: 0,
    size: file.size,
    status: 'imported',
    type: file.type,
  };
}
