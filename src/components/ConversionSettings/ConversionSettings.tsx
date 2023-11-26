import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConversionSettingsForm } from 'src/hooks/useConversionSettingsForm';
import { bitrateSchema, channelsSchema, codecSchema, sampleRateSchema } from 'src/schemas/conversionSettings.schema';
import { Form, FormField } from '../ui/Form';
import { BitrateSelect } from './BitrateSelect';
import { ChannelsSelect } from './ChannelsSelect';
import { CodecSelect } from './CodecSelect';
import { SampleRateSelect } from './SampleRateSelect';

export const ConversionSettings = () => {
  const { t } = useTranslation();
  const form = useConversionSettingsForm({
    defaultValues: {
      codec: codecSchema.enum.default,
      bitrate: bitrateSchema.enum.default,
      sampleRate: sampleRateSchema.enum.default,
      channels: channelsSchema.enum.default,
    },
  });
  const { control, setValue, watch } = form;
  const codec = watch('codec');

  useEffect(() => {
    setValue('bitrate', bitrateSchema.enum.default);
    setValue('sampleRate', sampleRateSchema.enum.default);
    setValue('channels', channelsSchema.enum.default);
  }, [codec, setValue]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4">
        <h2 className="title-sm mb-2">{t('conversionSettings.title')}</h2>
        <FormField
          control={control}
          name="codec"
          render={({ field }) => <CodecSelect onChange={field.onChange} value={field.value} />}
        />
        <FormField
          control={control}
          name="bitrate"
          render={({ field }) => <BitrateSelect codec={codec} onChange={field.onChange} value={field.value} />}
        />
        <FormField
          control={control}
          name="sampleRate"
          render={({ field }) => <SampleRateSelect codec={codec} onChange={field.onChange} value={field.value} />}
        />
        <FormField
          control={control}
          name="channels"
          render={({ field }) => <ChannelsSelect codec={codec} onChange={field.onChange} value={field.value} />}
        />
      </form>
    </Form>
  );
};
