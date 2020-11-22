/* eslint-disable sort-keys */
import i18n from '../../../i18n';

export default {
    defaultValue: 'passthru',
    id: 'codec',
    label: i18n.t('converter.conversionSettings.codec'),
    options: [
        {
            label: i18n.t('converter.conversionSettings.withoutAudioReencoding'),
            value: 'passthru',
        },
        {
            label: i18n.t('converter.conversionSettings.aac'),
            value: 'aac',
        },
        {
            label: i18n.t('converter.conversionSettings.ac3'),
            value: 'ac3',
        },
        // {
        //     label: i18n.t('converter.conversionSettings.dts'),
        //     value: 'dts',
        // },
        {
            label: i18n.t('converter.conversionSettings.eac3'),
            value: 'eac3',
        },
        {
            label: i18n.t('converter.conversionSettings.noAudioCodec'),
            value: 'none',
        },
    ],
};
