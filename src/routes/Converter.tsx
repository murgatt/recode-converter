import { fileStatusSchema } from 'schema';
import { ConversionSettingsForm } from 'src/components/ConversionSettingsForm';
import { FileImport } from 'src/components/FileImport';
import { FileList } from 'src/components/FileList';
import { Footer } from 'src/components/Footer';
import { getDestinationPath, getFiles, getFilesToConvert, useStore } from 'src/store';
import type { ConversionSettings } from 'schema';

export const Converter = () => {
  const files = useStore(getFiles);
  const filesToConvert = useStore(getFilesToConvert);
  const destinationPath = useStore(getDestinationPath);

  const isFileListDisplayed = files.length > 0;
  const isStartButtonDisabled = filesToConvert.length === 0;
  const isConversionRunning = files.some(file => file.status === fileStatusSchema.enum.converting);

  const handleStartConversion = (conversionSettings: ConversionSettings) => {
    window.conversion.startConversion({ conversionSettings, destinationPath, files: filesToConvert });
  };

  const handleStopConversion = () => window.conversion.stopConversion();

  return (
    <div className="flex h-full flex-col">
      <div className="flex grow overflow-hidden">
        <section className="grow">
          <FileImport isFileListDisplayed={isFileListDisplayed}>
            <FileList files={files} />
          </FileImport>
        </section>
        <section className="w-80 shrink-0 overflow-y-auto border-l p-4">
          <ConversionSettingsForm onStartConversion={handleStartConversion} />
        </section>
      </div>
      <Footer
        isConversionRunning={isConversionRunning}
        isStartButtonDisabled={isStartButtonDisabled}
        onStopConversion={handleStopConversion}
      />
    </div>
  );
};
