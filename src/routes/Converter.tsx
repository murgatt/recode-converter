import { ConversionSettingsForm } from 'src/components/ConversionSettingsForm';
import { FileImport } from 'src/components/FileImport';
import { FileList } from 'src/components/FileList';
import { Footer } from 'src/components/Footer';
import { getDestinationPath, getFilesToConvert, useStore } from 'src/store';
import type { ConversionSettings } from 'schema';

export const Converter = () => {
  const filesToConvert = useStore(getFilesToConvert);
  const destinationPath = useStore(getDestinationPath);

  const handleStartConversion = (conversionSettings: ConversionSettings) => {
    window.conversion.startConversion({ conversionSettings, destinationPath, files: filesToConvert });
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex grow overflow-hidden">
        <section className="grow">
          <FileImport>
            <FileList />
          </FileImport>
        </section>
        <section className="w-80 shrink-0 overflow-y-auto border-l p-4">
          <ConversionSettingsForm onStartConversion={handleStartConversion} />
        </section>
      </div>
      <Footer />
    </div>
  );
};
