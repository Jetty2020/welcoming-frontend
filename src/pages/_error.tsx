import Link from 'next/link';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import PageTitle from '@components/common/PageTitle';
import { pxToRem } from '@utils/pxToRem';
import { Layout } from '@components/layouts/Layout';
import { ROUTES } from '@constants/routes';

function Error() {
  const theme = useTheme();
  return (
    <>
      <PageTitle title="An error occurred" />
      <Layout>
        <Section>
          <Img src={theme.error.default} alt="에러 이미지" />
          <Title>에러가 발생했습니다.</Title>
          <Text>서비스 이용에 불편을 드려 죄송합니다.</Text>
          <Link href={ROUTES.home} passHref>
            <LinkHome>홈으로 가기</LinkHome>
          </Link>
        </Section>
      </Layout>
    </>
  );
}

export default Error;

const Section = styled.section`
  min-width: ${pxToRem(300)};
  padding: ${pxToRem(100)} 0;
  text-align: center;
  line-height: 1.5;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    padding: ${pxToRem(200)} 0;
  }
`;

const Img = styled.img`
  min-width: ${pxToRem(200)};
  width: 55%;
  max-width: ${pxToRem(280)};
  margin: 10vh auto ${pxToRem(40)};
`;

const Title = styled.h2`
  font-size: ${pxToRem(20)};
  font-weight: 600;
  word-break: keep-all;
`;

const Text = styled.p`
  margin-top: ${pxToRem(5)};
`;

const LinkHome = styled.a`
  display: inline-block;
  margin-top: ${pxToRem(20)};
  padding: ${pxToRem(10)} ${pxToRem(18)};
  border-radius: ${pxToRem(4)};
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
`;
