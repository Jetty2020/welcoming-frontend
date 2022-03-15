import { useEffect, useState } from 'react';
import { mode } from '@styles/theme';
import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';

export const useDarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(mode.light);

  useEffect(() => {
    setMounted(true);

    if (
      window.localStorage.getItem('welcoming-theme') === 'dark' ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !window.localStorage.getItem('welcoming-theme'))
    ) {
      isDark(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'welcoming-theme',
      `${isDark() ? 'dark' : 'light'}`,
    );
    if (window.localStorage.getItem('welcoming-theme') === 'dark') {
      setTheme(mode.dark);
    } else if (window.localStorage.getItem('welcoming-theme') === 'light') {
      setTheme(mode.light);
    }
  }, [useReactiveVar(isDark)]);

  return { theme, mounted };
};
