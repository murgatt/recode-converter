import { useSettingsForm } from 'src/hooks/useSettingsForm';
import { getSettingsFromStorage, saveSettingsToStorage } from 'src/utils';
import { Form, FormField } from '../ui/Form';
import { LanguageSelect } from './LanguageSelect';
import { NotificationsSelect } from './NotificationsSelect';
import { ThemeSelect } from './ThemeSelect';
import type { Settings } from 'src/schema/settings.schema';

export const SettingsForm = () => {
  const { language, notifications, theme } = getSettingsFromStorage();
  const form = useSettingsForm({
    defaultValues: { language, notifications, theme },
  });
  const { control, handleSubmit } = form;

  const onSubmit = (data: Settings) => {
    saveSettingsToStorage(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onChange={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="language"
          render={({ field }) => <LanguageSelect onChange={field.onChange} value={field.value} />}
        />
        <FormField
          control={control}
          name="notifications"
          render={({ field }) => <NotificationsSelect onChange={field.onChange} value={field.value} />}
        />
        <FormField
          control={control}
          name="theme"
          render={({ field }) => <ThemeSelect onChange={field.onChange} value={field.value} />}
        />
      </form>
    </Form>
  );
};
