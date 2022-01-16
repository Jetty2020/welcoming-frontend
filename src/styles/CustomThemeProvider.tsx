import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import { GlobalStyles } from './globals';
import { mode } from './theme';

export const CustomThemeProvider: React.FC = ({ children }) => {
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
  const toggleTheme = useCallback(() => {
    setDark((curr) => !curr);
  }, [dark]);

  const body = (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles(theme)} />
      {children}
      <DarkModeBtn type="button" onClick={toggleTheme}>
        {dark ? '라이트 모드로 보기' : '다크 모드로 보기'}
      </DarkModeBtn>
    </ThemeProvider>
  );

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>;
  }
  return body;
};

const DarkModeBtn = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 40px;
  padding: 0 25px;
  border-radius: 20px;
  background: ${({ theme }) => theme.bg.darkBtn};
  color: ${({ theme }) => theme.text.darkBtn};
  font-weight: 600;
`;
