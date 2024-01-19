/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLanguageFromLanguageSetting, getSettingsFromStorage } from 'src/utils';
import { en, fr } from './locales';

const resources = { en, fr };
const { language } = getSettingsFromStorage();
const lng = getLanguageFromLanguageSetting(language);

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
