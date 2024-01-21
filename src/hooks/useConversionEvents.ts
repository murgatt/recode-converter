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

  useEffect(() => {
    window.conversion.onConversionEnd(() => {
      setIsConversionRunning(false);
      showConversionEndNotification({
        body: t('notifications.onConversionEnd.body'),
        title: t('notifications.onConversionEnd.title'),
      });
    });
    window.conversion.onFileConversionStart((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.converting);
    });
    window.conversion.onFileConversionProgress((_event, { filePath, progress }) => setFileProgress(filePath, progress));
    window.conversion.onFileConversionEnd((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionSuccess);
      showFileConversionEndNotification({ filePath, title: t('notifications.onFileConversionEnd.title') });
    });
    window.conversion.onFileConversionError((_event, { filePath }) => {
      setFileStatus(filePath, fileStatusSchema.enum.conversionError);
    });
    window.conversion.onFileMetadata((_event, { filePath, metadata }) => {
      setFileMetadata(filePath, metadata);
    });
  }, [setIsConversionRunning, setFileMetadata, setFileProgress, setFileStatus, t]);
};
