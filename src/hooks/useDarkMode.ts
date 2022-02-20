import { useEffect, useState } from 'react';
import { mode } from '@styles/theme';

export const useDarkMode = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState(mode.light);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);

    if (
      window.localStorage.getItem('welcoming-theme') === 'dark' ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches &&
        !window.localStorage.getItem('welcoming-theme'))
    ) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      'welcoming-theme',
      `${dark ? 'dark' : 'light'}`,
    );
    if (window.localStorage.getItem('welcoming-theme') === 'dark') {
      setTheme(mode.dark);
    } else if (window.localStorage.getItem('welcoming-theme') === 'light') {
      setTheme(mode.light);
    }
  }, [dark]);

  return { dark, theme, mounted, setDark };
};
