import styled from '@emotion/styled';
import { MobileNav } from './MobileNav';
import { DesktopNav } from './DesktopNav';

export const Navigation = () => {
  return (
    <>
      <MobileNaviagtion />
      <DesktopNavigation />
    </>
  );
};

const MobileNaviagtion = styled(MobileNav)`
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: none;
  }
`;

const DesktopNavigation = styled(DesktopNav)`
  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: none;
  }
`;
