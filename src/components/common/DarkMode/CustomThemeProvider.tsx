import { Global, ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { GlobalStyles } from '@styles/globals';
import { useDarkMode } from '@hooks/useDarkMode';

export const CustomThemeProvider: React.FC = ({ children }) => {
  const { theme, mounted } = useDarkMode();
  const body = (
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles(theme)} />
      {children}
    </ThemeProvider>
  );

  if (!mounted) {
    return <ContainerHidden>{body}</ContainerHidden>;
  }
  return body;
};

const ContainerHidden = styled.div`
  visibility: hidden;
`;
