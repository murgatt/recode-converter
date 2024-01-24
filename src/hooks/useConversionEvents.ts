import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fileStatusSchema } from 'schema';
import { useStore } from 'src/store';
import { showConversionEndNotification, showFileConversionEndNotification } from 'src/utils';

export const useConversionEvents = () => {
  const { t } = useTranslation();
  const setFileStatus = useStore(state => state.setFileStatus);
  const setFileProgress = useStore(state => state.setFileProgress);
  const setFileMetadata = useStore(state => state.setFileMetadata);
  const setIsConversionRunning = useStore(state => state.setIsConversionRunning);
  const setFileError = useStore(state => state.setFileError);
  const setFileFfmpegCommand = useStore(state => state.setFileFfmpegCommand);

  useEffect(() => {
    window.conversion.onConversionEnd(() => {
      setIsConversionRunning(false);
      showConversionEndNotification({
        body: t('notifications.onConversionEnd.body'),
        title: t('notifications.onConversionEnd.title'),
      });
    });
    window.conversion.onFileConversionStart((_event, { ffmpegCommand, filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.converting);
      setFileFfmpegCommand(filePath, ffmpegCommand);
    });
    window.conversion.onFileConversionProgress((_event, { filePath, progress }) => setFileProgress(filePath, progress));
    window.conversion.onFileConversionEnd((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionSuccess);
      showFileConversionEndNotification({ filePath, title: t('notifications.onFileConversionEnd.title') });
    });
    window.conversion.onFileConversionError((_event, { filePath, error }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionError);
      setFileError(filePath, error);
      // eslint-disable-next-line no-console
      console.error(error);
    });
    window.conversion.onFileMetadata((_event, { filePath, metadata }) => {
      setFileMetadata(filePath, metadata);
    });
  }, [setFileFfmpegCommand, setIsConversionRunning, setFileError, setFileMetadata, setFileProgress, setFileStatus, t]);
};
