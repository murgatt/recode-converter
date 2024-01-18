import { useTranslation } from 'react-i18next';
import { themeSettingSchema } from 'src/schema/settings.schema';
import { useStore } from 'src/store';
import { FormControl, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { ThemeSetting } from 'src/schema/settings.schema';

type ThemeSelectProps = {
  onChange: (value: ThemeSetting) => void;
  value: ThemeSetting;
};

export const ThemeSelect = ({ onChange, value }: ThemeSelectProps) => {
  const { t } = useTranslation();
  const setTheme = useStore(state => state.setTheme);
  const options = themeSettingSchema.options.map(option => option);

  const handleChange = (theme: ThemeSetting) => {
    onChange(theme);
    setTheme(theme);
  };

  return (
    <div className="flex items-center gap-2">
      <FormLabel className="w-60">{t('settings.theme.label')}</FormLabel>
      <Select onValueChange={handleChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`settings.theme.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
