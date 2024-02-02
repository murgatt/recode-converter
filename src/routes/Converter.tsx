import { trackEvent } from '@aptabase/electron/renderer';
import { ConversionSettingsForm } from 'src/components/ConversionSettingsForm';
import { FileImport } from 'src/components/FileImport';
import { FileList } from 'src/components/FileList';
import { Footer } from 'src/components/Footer';
import { getDestinationPath, getFiles, getFilesToConvert, getIsConversionRunning, useStore } from 'src/store';
import type { ConversionSettings } from 'schema';

export const Converter = () => {
  const files = useStore(getFiles);
  const filesToConvert = useStore(getFilesToConvert);
  const destinationPath = useStore(getDestinationPath);
  const isConversionRunning = useStore(getIsConversionRunning);
  const setIsConversionRunning = useStore(state => state.setIsConversionRunning);

  const isFileListDisplayed = files.length > 0;
  const isStartButtonDisabled = filesToConvert.length === 0;

  const handleStartConversion = (conversionSettings: ConversionSettings) => {
    setIsConversionRunning(true);
    window.conversion.startConversion({ conversionSettings, destinationPath, files: filesToConvert });
    trackEvent('conversion_start', { files: files.length, ...conversionSettings });
  };

  const handleStopConversion = () => {
    window.conversion.stopConversion();
    trackEvent('conversion_stop');
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex grow overflow-hidden">
        <section className="grow">
          <FileImport isDisabled={isConversionRunning} isFileListDisplayed={isFileListDisplayed}>
            <FileList files={files} isConversionRunning={isConversionRunning} />
          </FileImport>
        </section>
        <section className="w-80 shrink-0 overflow-y-auto border-l p-4">
          <ConversionSettingsForm isDisabled={isConversionRunning} onStartConversion={handleStartConversion} />
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
