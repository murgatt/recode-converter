import { useEffect } from 'react';

function switchTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useTheme = () => {
  const darkModePreference = window.matchMedia('(prefers-color-scheme: dark)');

  useEffect(() => {
    const isDark = darkModePreference.matches;

    const handleChange = (event: MediaQueryListEvent) => {
      switchTheme(event.matches);
    };

    darkModePreference.addEventListener('change', handleChange);
    switchTheme(isDark);

    return () => {
      darkModePreference.removeEventListener('change', handleChange);
    };
  }, [darkModePreference]);
};
