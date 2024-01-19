import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { settingsSchema } from 'src/schema/settings.schema';
import type { UseFormProps } from 'react-hook-form';
import type { Settings } from 'src/schema/settings.schema';

export const useSettingsForm = (props?: UseFormProps<Settings>) => {
  return useForm<Settings>({
    ...props,
    resolver: zodResolver(settingsSchema),
  });
};
