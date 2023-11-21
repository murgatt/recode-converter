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
