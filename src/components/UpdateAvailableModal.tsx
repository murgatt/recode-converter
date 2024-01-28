import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { version } from '../../package.json';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/AlertDialog';

const GITHUB_API_URL = 'https://api.github.com/repos/murgatt/recode-converter/releases/latest';
const APP_WEBSITE_URL = 'https://murgatt.github.io/recode-converter/';

export const UpdateAvailableModal = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkVersion = async () => {
      const response = await fetch(GITHUB_API_URL);

      if (!response.ok) {
        return;
      }

      const latestRelease: { tag_name: string } = await response.json();
      const latestVersion = latestRelease.tag_name.replace('v', '');
      const isUpdateAvailable = latestVersion.localeCompare(version, undefined, { numeric: true }) > 0;
      setIsOpen(isUpdateAvailable);
    };
    checkVersion();
  }, []);

  const handleUpdate = () => {
    window.electron.openExternalLink(APP_WEBSITE_URL);
  };

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('appVersionModal.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('appVersionModal.description')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('appVersionModal.cancel')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>{t('appVersionModal.submit')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
