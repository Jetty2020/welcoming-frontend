import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { GlobalStyles } from '@styles/globals';
import { useDarkMode } from '@hooks/useDarkMode';

export const CustomThemeProvider: React.FC = ({ children }) => {
  const { dark, theme, mounted, toggleTheme } = useDarkMode();
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
    return <HiddenDiv>{body}</HiddenDiv>;
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
  background: ${({ theme }) => theme.toggleMode.background};
  color: ${({ theme }) => theme.toggleMode.text};
  font-weight: 600;
`;

const HiddenDiv = styled.div`
  visibility: hidden;
`;
