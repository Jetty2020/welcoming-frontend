import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import { DarkIcon, LightIcon } from 'public/icons';

interface DarkModeBtnProps {
  dark: boolean;
  toggleTheme: (value: boolean) => void;
}

export const DarkModeBtn = ({ dark, toggleTheme }: DarkModeBtnProps) => {
  return (
    <StyledButton type="button" onClick={() => toggleTheme(!dark)}>
      {dark ? <DarkIcon /> : <LightIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: fixed;
  bottom: ${pxToRem(30)};
  right: ${pxToRem(30)};
  padding: ${pxToRem(12)};
  border-radius: 50%;
  background: ${({ theme }) => theme.toggleMode.background};
  color: ${({ theme }) => theme.toggleMode.text};

  & svg {
    width: ${pxToRem(20)};
  }
`;
