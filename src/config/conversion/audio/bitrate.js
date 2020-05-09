/* eslint-disable sort-keys */
import i18n from '../../../i18n';

export default {
    defaultValue: 'default',
    id: 'bitrate',
    label: i18n.t('conversionSettings.bitrate'),
    aac: {
        options: [
            {
                label: i18n.t('default'),
                value: 'default',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 32 }),
                value: '32k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 64 }),
                value: '64k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 96 }),
                value: '96k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 128 }),
                value: '128k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 192 }),
                value: '192k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 256 }),
                value: '256k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 320 }),
                value: '320k',
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
                label: i18n.t('conversionSettings.bitrateValue', { value: 128 }),
                value: '128k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 192 }),
                value: '192k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 256 }),
                value: '256k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 320 }),
                value: '320k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 384 }),
                value: '384k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 448 }),
                value: '448k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 512 }),
                value: '512',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 640 }),
                value: '640k',
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
                label: i18n.t('conversionSettings.bitrateValue', { value: 320 }),
                value: '320k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 448 }),
                value: '448k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 640 }),
                value: '640k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 768 }),
                value: '768k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 1536 }),
                value: '1536k',
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
                label: i18n.t('conversionSettings.bitrateValue', { value: 192 }),
                value: '192k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 320 }),
                value: '320k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 448 }),
                value: '448k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 640 }),
                value: '640k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 1024 }),
                value: '1024k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 2048 }),
                value: '2048k',
            },
            {
                label: i18n.t('conversionSettings.bitrateValue', { value: 4096 }),
                value: '4096k',
            },
        ],
    },
};
