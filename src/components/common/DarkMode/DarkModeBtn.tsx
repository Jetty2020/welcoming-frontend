import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import { DarkIcon, LightIcon } from 'public/icons';

export const DarkModeBtn = () => {
  return (
    <StyledButton type="button" onClick={() => isDark(!isDark())}>
      {isDark() ? <DarkIcon /> : <LightIcon />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: fixed;
  bottom: ${pxToRem(30)};
  right: ${pxToRem(30)};
  padding: ${pxToRem(12)};
  border-radius: 50%;
  box-shadow: 0 0 ${pxToRem(5)} rgba(0, 0, 0, 0.1);
  background: ${({ theme }) => theme.toggleMode.background};
  color: ${({ theme }) => theme.toggleMode.text};

  & svg {
    width: ${pxToRem(20)};
    vertical-align: middle;
  }
`;
