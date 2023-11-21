export type State = {
  files: Record<string, File>;
};

export type Actions = {
  addFiles: (files: File[]) => void;
  clearFiles: () => void;
  removeFile: (filePath: string) => void;
};

export type Store = State & Actions;
