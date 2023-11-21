import { describe, expect, it } from 'vitest';
import { formatFileSize } from '../file.utils';

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
});
