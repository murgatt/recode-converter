import { dialog } from 'electron';

export async function handleOpenDirectory() {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] });

  if (canceled) {
    return '';
  }

  return filePaths[0];
}
