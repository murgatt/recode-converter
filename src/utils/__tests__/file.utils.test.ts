import { describe, expect, it } from 'vitest';
import { areFilesFromSameDirectory, formatFileSize, getDirectoryPathFromFile } from '../file.utils';
import type { VideoFile } from 'schema';

describe('file.utils', () => {
  describe('formatFileSize', () => {
    it.each([
      { fileSize: 0, formattedFileSize: '0.00 octets' },
      { fileSize: 1024, formattedFileSize: '1.00 Ko' },
      { fileSize: 1048576, formattedFileSize: '1.00 Mo' },
      { fileSize: 1073741824, formattedFileSize: '1.00 Go' },
      { fileSize: 1099511627776, formattedFileSize: '1.00 To' },
    ])('should returns $formattedFileSize when file size is $fileSize)', ({ fileSize, formattedFileSize }) => {
      expect(formatFileSize(fileSize)).toBe(formattedFileSize);
    });
  });

  describe('getDirectoryPathFromFile', () => {
    it('should return the directory path of the file', () => {
      const file = { path: '/movies/matrix.mkv' } as VideoFile;
      expect(getDirectoryPathFromFile(file)).toBe('/movies');
    });
  });

  describe('areFilesFromSameDirectory', () => {
    it('should return true if all files are from the same directory', () => {
      const file1 = { path: '/movies/matrix.mkv' } as VideoFile;
      const file2 = { path: '/movies/shining.mkv' } as VideoFile;
      expect(areFilesFromSameDirectory([file1, file2])).toBe(true);
    });

    it('should return false if files are from the different directories', () => {
      const file1 = { path: '/movies/matrix.mkv' } as VideoFile;
      const file2 = { path: '/medias/shining.mkv' } as VideoFile;
      expect(areFilesFromSameDirectory([file1, file2])).toBe(false);
    });
  });
});
