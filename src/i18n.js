import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './i18n/en.json';

const resources = {
    en,
};

i18n.use(initReactI18next).init({
    interpolation: {
        escapeValue: false,
    },
    lng: 'en',
    resources,
});

export default i18n;
