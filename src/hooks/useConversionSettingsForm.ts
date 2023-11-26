import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema } from 'src/schemas/conversionSettings.schema';
import { z } from 'zod';
import type { UseFormProps } from 'react-hook-form';

const formSchema = z.object({
  codec: codecSchema,
  bitrate: bitrateSchema,
  sampleRate: sampleRateSchema,
  channels: channelsSchema,
});

type FormData = z.infer<typeof formSchema>;

export const useConversionSettingsForm = (props?: UseFormProps<FormData>) => {
  return useForm<FormData>({
    ...props,
    resolver: zodResolver(formSchema),
  });
};
