import { z } from 'zod';

export const languageSettingSchema = z.enum(['auto', 'en', 'fr']);
export type LanguageSetting = z.infer<typeof languageSettingSchema>;

export const notificationsSettingSchema = z.enum(['disabled', 'onConversionEnd', 'onFileConversionEnd']);
export type NotificationsSetting = z.infer<typeof notificationsSettingSchema>;

export const themeSettingSchema = z.enum(['system', 'light', 'dark']);
export type ThemeSetting = z.infer<typeof themeSettingSchema>;

export const settingsSchema = z.object({
  language: languageSettingSchema,
  notifications: notificationsSettingSchema,
  theme: themeSettingSchema,
});
export type Settings = z.infer<typeof settingsSchema>;
