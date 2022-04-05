import { ROUTES } from '@constants/routes';
import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';

export const AuthFooter = () => {
  return (
    <FooterPasswordReset>
      <Link href={ROUTES.home} passHref>
        <a>© &nbsp;welcoming, Co., Ltd.</a>
      </Link>
      테스트 2
    </FooterPasswordReset>
  );
};

const FooterPasswordReset = styled.footer`
  padding: ${pxToRem(30)} 0;
  font-size: ${pxToRem(14)};
`;
