import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';

export const AuthFooter = () => {
  return (
    <FooterPasswordReset>
      <Link href="/" passHref>
        <a>© &nbsp;welcoming, Co., Ltd.</a>
      </Link>
      . All Rights Reserved
    </FooterPasswordReset>
  );
};

const FooterPasswordReset = styled.footer`
  padding: ${pxToRem(30)} 0;
  font-size: ${pxToRem(14)};
`;
