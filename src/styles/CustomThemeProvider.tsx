import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { mode } from './theme';

export const CustomThemeProvider: React.FC = ({ children }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setMode] = useState(mode.light);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setMounted(true);
    if (window.localStorage.getItem('welcoming-theme') === 'dark') {
      setMode(mode.dark);
    } else if (window.localStorage.getItem('welcoming-theme') === 'light') {
      setMode(mode.light);
    }
  }, [dark]);
  const toggleTheme = useCallback(() => {
    setDark((curr) => !curr);
    window.localStorage.setItem(
      'welcoming-theme',
      `${dark ? 'dark' : 'light'}`,
    );
  }, [dark]);

  const body = (
    <ThemeProvider theme={theme}>
      {children}
      <button type="button" onClick={toggleTheme}>
        다크모드
      </button>
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }
  return body;
};
