import { trackEvent } from '@aptabase/electron/renderer';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import { languageSettingSchema } from 'src/schema/settings.schema';
import { getLanguageFromLanguageSetting } from 'src/utils';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { LanguageSetting } from 'src/schema/settings.schema';

type LanguageSelectProps = {
  onChange: (value: LanguageSetting) => void;
  value: LanguageSetting;
};

export const LanguageSelect = ({ onChange, value }: LanguageSelectProps) => {
  const { t } = useTranslation();
  const options = languageSettingSchema.options.map(option => option);

  const handleChange = async (languageSetting: LanguageSetting) => {
    onChange(languageSetting);
    const language = getLanguageFromLanguageSetting(languageSetting);
    await i18n.changeLanguage(language);
    trackEvent('setting_change', { language: languageSetting });
  };

  return (
    <FormItem className="flex flex-row items-center gap-2">
      <FormLabel className="w-72 shrink-0">{t('settings.language.label')}</FormLabel>
      <Select onValueChange={handleChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`settings.language.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
