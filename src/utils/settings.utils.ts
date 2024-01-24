import { languageSettingSchema, notificationsSettingSchema, themeSettingSchema } from 'src/schema/settings.schema';
import type { LanguageSetting, Settings } from 'src/schema/settings.schema';

const STORAGE_KEY = 'recode-converter.settings';

const defaultSettings: Settings = {
  language: languageSettingSchema.enum.auto,
  notifications: notificationsSettingSchema.enum.disabled,
  theme: themeSettingSchema.enum.system,
  ffmpegCommand: false,
};

export function getSettingsFromStorage() {
  const settings = localStorage.getItem(STORAGE_KEY);

  return settings ? { ...defaultSettings, ...(JSON.parse(settings) as Settings) } : defaultSettings;
}

export function saveSettingsToStorage(settings: Settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function getLanguageFromLanguageSetting(languageSetting: LanguageSetting) {
  return languageSetting === languageSettingSchema.enum.auto ? navigator.language : languageSetting;
}
