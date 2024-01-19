import { useEffect } from 'react';
import { themeSettingSchema } from 'src/schema/settings.schema';
import { getTheme, useStore } from 'src/store';

function switchTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useTheme = () => {
  const theme = useStore(getTheme);
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    const isDark =
      theme === themeSettingSchema.enum.system ? darkModePreference.matches : theme === themeSettingSchema.enum.dark;

    const handleChange = (event: MediaQueryListEvent) => {
      switchTheme(event.matches);
    };

    darkModePreference.addEventListener('change', handleChange);
    switchTheme(isDark);

    return () => {
      darkModePreference.removeEventListener('change', handleChange);
    };
  }, [darkModePreference, theme]);
};
