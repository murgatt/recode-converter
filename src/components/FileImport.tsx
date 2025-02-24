import { FileVideoIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useStore } from 'src/store';
import { Button } from './ui/Button';
import type { ChangeEvent, DragEvent } from 'react';

type FileImportProps = {
  children: React.ReactNode;
  isDisabled: boolean;
  isFileListDisplayed: boolean;
};

export const FileImport = ({ children, isDisabled, isFileListDisplayed }: FileImportProps) => {
  const { t } = useTranslation();
  const addFiles = useStore(state => state.addFiles);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!isDisabled) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    if (!isDisabled) {
      const files = Array.from(event.dataTransfer.files);
      addFiles(files);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    addFiles(files);
  };

  return (
    <div
      className="relative h-full w-full focus:outline-hidden"
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        accept="video/*,.mkv"
        className="hidden"
        disabled={isDisabled}
        id="fileInput"
        multiple
        onChange={handleFileInputChange}
        type="file"
      />
      {isFileListDisplayed ? (
        children
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <Button asChild className="cursor-pointer">
            <label htmlFor="fileInput">{t('fileImport.button')}</label>
          </Button>
          <p className="text-center caption-sm whitespace-pre-line">{t('fileImport.description')}</p>
        </div>
      )}
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-xs">
          <FileVideoIcon className="animate-bounce" size="32" />
        </div>
      )}
    </div>
  );
};
