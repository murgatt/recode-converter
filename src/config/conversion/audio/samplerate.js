/* eslint-disable sort-keys */
import i18n from '../../../i18n';

export default {
    defaultValue: 'default',
    id: 'samplerate',
    label: i18n.t('conversionSettings.sampleRate'),
    aac: {
        options: [
            {
                label: i18n.t('sameAsSource'),
                value: 'default',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 8000 }),
                value: '8000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 22050 }),
                value: '22050',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 32000 }),
                value: '32000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 44100 }),
                value: '44100',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 48000 }),
                value: '48000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 96000 }),
                value: '96000',
            },
        ],
    },
    ac3: {
        options: [
            {
                label: i18n.t('default'),
                value: 'default',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 8000 }),
                value: '8000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 22050 }),
                value: '22050',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 32000 }),
                value: '32000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 44100 }),
                value: '44100',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 48000 }),
                value: '48000',
            },
        ],
    },
    dts: {
        options: [
            {
                label: i18n.t('default'),
                value: 'default',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 8000 }),
                value: '8000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 22050 }),
                value: '22050',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 32000 }),
                value: '32000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 44100 }),
                value: '44100',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 48000 }),
                value: '48000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 96000 }),
                value: '96000',
            },
        ],
    },
    eac3: {
        options: [
            {
                label: i18n.t('default'),
                value: 'default',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 32000 }),
                value: '32000',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 44100 }),
                value: '44100',
            },
            {
                label: i18n.t('conversionSettings.sampleRateValue', { value: 48000 }),
                value: '48000',
            },
        ],
    },
};
