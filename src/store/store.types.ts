export type State = {
  destinationPath: string;
  files: Record<string, File>;
};

export type Actions = {
  addFiles: (files: File[]) => void;
  clearFiles: () => void;
  removeFile: (filePath: string) => void;
  setDestinationPath: (destinationPath: string) => void;
};

export type Store = State & Actions;
