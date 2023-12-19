import { useEffect } from 'react';
import { fileStatusSchema } from 'schema';
import { useStore } from 'src/store';

export const useConversionEvents = () => {
  const setFileStatus = useStore(state => state.setFileStatus);
  const setFileProgress = useStore(state => state.setFileProgress);

  useEffect(() => {
    window.conversion.onFileConversionStart((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.converting);
    });
    window.conversion.onFileConversionProgress((_event, { filePath, progress }) => setFileProgress(filePath, progress));
    window.conversion.onFileConversionEnd((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionSuccess);
    });
    window.conversion.onFileConversionError((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionError);
    });
  }, [setFileProgress, setFileStatus]);
};
