import { FileVideoIcon } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import { getFiles, useStore } from 'src/store';
import { Button } from './ui/Button';

type FileImportProps = {
  children?: React.ReactNode;
};

export const FileImport = ({ children }: FileImportProps) => {
  const { t } = useTranslation();
  const files = useStore(getFiles);
  const displayFileList = files.length > 0;
  const addFiles = useStore(state => state.addFiles);

  const handleFilesDrop = (newFiles: File[]) => {
    addFiles(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': ['.mkv'],
    },
    noClick: true,
    onDropAccepted: handleFilesDrop,
  });

  return (
    <div {...getRootProps()} className="relative h-full w-full">
      <input {...getInputProps()} id="fileInput" value="" />
      {displayFileList ? (
        children
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <Button asChild className="cursor-pointer">
            <label htmlFor="fileInput">{t('fileImport.button')}</label>
          </Button>
          <p className="caption-sm whitespace-pre-line text-center">{t('fileImport.description')}</p>
        </div>
      )}
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <FileVideoIcon className="animate-bounce" size="32" />
        </div>
      )}
    </div>
  );
};
