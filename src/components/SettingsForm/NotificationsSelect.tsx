import { trackEvent } from '@aptabase/electron/renderer';
import { useTranslation } from 'react-i18next';
import { notificationsSettingSchema } from 'src/schema/settings.schema';
import { FormControl, FormItem, FormLabel } from '../ui/Form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';
import type { NotificationsSetting } from 'src/schema/settings.schema';

type NotificationsSelectProps = {
  onChange: (value: NotificationsSetting) => void;
  value: NotificationsSetting;
};

export const NotificationsSelect = ({ onChange, value }: NotificationsSelectProps) => {
  const { t } = useTranslation();
  const options = notificationsSettingSchema.options.map(option => option);

  const handleChange = async (notificationsSetting: NotificationsSetting) => {
    if (notificationsSetting !== notificationsSettingSchema.enum.disabled) {
      const permission = await Notification.requestPermission();

      if (permission !== 'granted') {
        trackEvent('notification_not_granted', { permission });

        return;
      }
    }

    onChange(notificationsSetting);
    trackEvent('setting_change', { notifications: notificationsSetting });
  };

  return (
    <FormItem className="flex flex-row items-center gap-2">
      <FormLabel className="w-72 shrink-0">{t('settings.notifications.label')}</FormLabel>
      <Select onValueChange={handleChange} value={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option} value={option}>
              {t(`settings.notifications.values.${option}`)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormItem>
  );
};
