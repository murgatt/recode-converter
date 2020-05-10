import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import fr from './fr.json';

const resources = {
    en,
    fr,
};

i18n.use(initReactI18next).init({
    interpolation: {
        escapeValue: false,
    },
    lng: navigator.language,
    resources,
});

export default i18n;
