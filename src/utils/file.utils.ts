export function formatFileSize(sizeInBytes: number): string {
  const base = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];

  let size = sizeInBytes;
  let unitIndex = 0;

  while (size >= base && unitIndex < units.length - 1) {
    size /= base;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}
