import { useTranslation } from 'react-i18next';
import { bitrateSchema, channelsSchema, sampleRateSchema } from 'schema';
import { useConversionSettingsForm } from 'src/hooks/useConversionSettingsForm';
import { getConversionSettings, useStore } from 'src/store';
import { Form, FormField } from '../ui/Form';
import { Separator } from '../ui/Separator';
import { BitrateSelect } from './BitrateSelect';
import { ChannelsSelect } from './ChannelsSelect';
import { CodecSelect } from './CodecSelect';
import { SampleRateSelect } from './SampleRateSelect';
import { SubtitleSelect } from './SubtitleSelect';
import type { Codec, ConversionSettings } from 'schema';

type ConversionSettingsFormProps = {
  isDisabled: boolean;
  onStartConversion: (conversionSettings: ConversionSettings) => void;
};

export const ConversionSettingsForm = ({ isDisabled, onStartConversion }: ConversionSettingsFormProps) => {
  const { t } = useTranslation();
  const conversionSettings = useStore(getConversionSettings);
  const setConversionSettings = useStore(state => state.setConversionSettings);

  const form = useConversionSettingsForm({ defaultValues: conversionSettings });
  const { control, getValues, handleSubmit, setValue, watch } = form;
  const codec = watch('codec');

  const handleCodecChange = (value: Codec) => {
    setValue('codec', value);
    setValue('bitrate', bitrateSchema.enum.default);
    setValue('sampleRate', sampleRateSchema.enum.default);
    setValue('channels', channelsSchema.enum.default);
  };

  const handleChange = () => {
    const values = getValues();
    setConversionSettings(values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        id="conversionSettingsForm"
        onChange={handleChange}
        onSubmit={handleSubmit(onStartConversion)}
      >
        <h2 className="title-sm mb-2">{t('conversionSettings.title')}</h2>
        <FormField
          control={control}
          name="codec"
          render={({ field }) => (
            <CodecSelect isDisabled={isDisabled} onChange={handleCodecChange} value={field.value} />
          )}
        />
        <FormField
          control={control}
          name="bitrate"
          render={({ field }) => (
            <BitrateSelect codec={codec} isDisabled={isDisabled} onChange={field.onChange} value={field.value} />
          )}
        />
        <FormField
          control={control}
          name="sampleRate"
          render={({ field }) => (
            <SampleRateSelect codec={codec} isDisabled={isDisabled} onChange={field.onChange} value={field.value} />
          )}
        />
        <FormField
          control={control}
          name="channels"
          render={({ field }) => (
            <ChannelsSelect codec={codec} isDisabled={isDisabled} onChange={field.onChange} value={field.value} />
          )}
        />
        <Separator className="my-2" />
        <FormField
          control={control}
          name="subtitle"
          render={({ field }) => (
            <SubtitleSelect isDisabled={isDisabled} onChange={field.onChange} value={field.value} />
          )}
        />
      </form>
    </Form>
  );
};
