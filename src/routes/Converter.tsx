import { FileImport } from 'src/components/FileImport';
import { FileList } from 'src/components/FileList';

export const Converter = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="flex grow overflow-hidden">
        <section className="grow">
          <FileImport>
            <FileList />
          </FileImport>
        </section>
        <section className="w-80 shrink-0 overflow-y-auto border-l p-4">
          <h2 className="title-sm">Conversion Settings</h2>
        </section>
      </div>
      <footer className="shrink-0 border-t">Footer</footer>
    </div>
  );
};
