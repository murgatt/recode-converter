import { useTranslation } from 'react-i18next';
import { SettingsForm } from 'src/components/SettingsForm';

export const Settings = () => {
  const { t } = useTranslation();

  return (
    <section className="h-screen overflow-y-auto p-6">
      <header className="mb-6">
        <h1 className="title-lg">{t('settings.title')}</h1>
      </header>
      <SettingsForm />
    </section>
  );
};
