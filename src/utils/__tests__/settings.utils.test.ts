import { languageSettingSchema, notificationsSettingSchema, themeSettingSchema } from 'src/schema/settings.schema';
import { afterEach, describe, expect, it } from 'vitest';
import { getLanguageFromLanguageSetting, getSettingsFromStorage } from '../settings.utils';

describe('settings.utils', () => {
  describe('getSettingsFromStorage', () => {
    afterEach(() => {
      localStorage.clear();
    });

    it('should return default settings by default', () => {
      expect(getSettingsFromStorage()).toEqual({
        language: languageSettingSchema.enum.auto,
        notifications: notificationsSettingSchema.enum.disabled,
        theme: themeSettingSchema.enum.system,
      });
    });

    it('should return settings if defined', () => {
      const settings = {
        language: languageSettingSchema.enum.fr,
        notifications: notificationsSettingSchema.enum.onConversionEnd,
        theme: themeSettingSchema.enum.dark,
      };
      localStorage.setItem('recode-converter.settings', JSON.stringify(settings));

      expect(getSettingsFromStorage()).toEqual({
        language: languageSettingSchema.enum.fr,
        notifications: notificationsSettingSchema.enum.onConversionEnd,
        theme: themeSettingSchema.enum.dark,
      });
    });
  });

  describe('getLanguageFromLanguageSetting', () => {
    it('should return navigator language if setting is set to auto', () => {
      const language = getLanguageFromLanguageSetting(languageSettingSchema.enum.auto);

      expect(language).toBe('en-US');
    });

    it('should return language setting if setting is set to a specific language', () => {
      const language = getLanguageFromLanguageSetting(languageSettingSchema.enum.fr);

      expect(language).toBe('fr');
    });
  });
});
