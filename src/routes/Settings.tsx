import { useTranslation } from 'react-i18next';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <section className="h-screen overflow-y-auto p-6">
      <header>
        <h1 className="title-lg">{t('settings.title')}</h1>
      </header>
    </section>
  );
};
