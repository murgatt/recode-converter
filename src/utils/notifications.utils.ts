import { notificationsSettingSchema } from '../schema/settings.schema';
import { getSettingsFromStorage } from './settings.utils';

export function showConversionEndNotification({ body, title }: { body: string; title: string }) {
  const { notifications } = getSettingsFromStorage();
  if (notifications === notificationsSettingSchema.enum.onConversionEnd) {
    new Notification(title, { body });
  }
}

export function showFileConversionEndNotification({ filePath, title }: { filePath: string; title: string }) {
  const { notifications } = getSettingsFromStorage();
  const fileName = filePath.split('/').at(-1);

  if (notifications === notificationsSettingSchema.enum.onFileConversionEnd) {
    new Notification(title, { body: fileName });
  }
}
