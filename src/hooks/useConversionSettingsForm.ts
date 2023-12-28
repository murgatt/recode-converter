import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { conversionSettingsSchema } from 'schema';
import type { UseFormProps } from 'react-hook-form';
import type { ConversionSettings } from 'schema';

export const useConversionSettingsForm = (props?: UseFormProps<ConversionSettings>) => {
  return useForm<ConversionSettings>({
    ...props,
    resolver: zodResolver(conversionSettingsSchema),
  });
};
