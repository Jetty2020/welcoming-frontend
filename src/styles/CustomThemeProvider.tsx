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
      <DarkModeBtn type="button" onClick={toggleTheme}>
        {dark ? '다크 모드' : '라이트 모드'}
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
  width: 75px;
  height: 75px;
  border-radius: 30%;
  background: ${({ theme }) => theme.bg.darkBtn};
  color: ${({ theme }) => theme.text.darkBtn};
  font-weight: 600;
`;
