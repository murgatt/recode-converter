/* eslint-disable sort-keys */
import i18n from '../../../i18n';

export default {
    defaultValue: 'passthru',
    id: 'codec',
    label: i18n.t('conversionSettings.codec'),
    options: [
        {
            label: i18n.t('conversionSettings.withoutAudioReencoding'),
            value: 'passthru',
        },
        {
            label: i18n.t('conversionSettings.aac'),
            value: 'aac',
        },
        {
            label: i18n.t('conversionSettings.ac3'),
            value: 'ac3',
        },
        // {
        //     label: i18n.t('conversionSettings.dts'),
        //     value: 'dts',
        // },
        {
            label: i18n.t('conversionSettings.eac3'),
            value: 'eac3',
        },
        {
            label: i18n.t('conversionSettings.noAudioCodec'),
            value: 'none',
        },
    ],
};
