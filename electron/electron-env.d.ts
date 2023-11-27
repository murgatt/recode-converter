/// <reference types="vite-plugin-electron/electron-env" />
declare namespace NodeJS {
  interface ProcessEnv {
    DIST: string;
    VITE_PUBLIC: string;
  }
}

export interface IElectronAPI {
  openDirectory: () => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
