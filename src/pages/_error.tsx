import Link from 'next/link';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import PageTitle from '@components/common/PageTitle';
import { pxToRem } from '@utils/pxToRem';

function Error() {
  const theme = useTheme();
  return (
    <>
      <PageTitle title="An error occurred" />
      <Header>
        <Link href="/" passHref>
          <a>
            <ImgLogo src={theme.logo.src} alt="웰커밍 로고" />
          </a>
        </Link>
      </Header>
      <Section>
        <Img src={theme.error.default} alt="에러 이미지" />
        <Title>에러가 발생했습니다.</Title>
        <Text>서비스 이용에 불편을 드려 죄송합니다.</Text>
        <Link href="/" passHref>
          <BtnBack>이전 페이지로 돌아가기</BtnBack>
        </Link>
      </Section>
    </>
  );
}

export default Error;

const Header = styled.header`
  background: ${({ theme }) => theme.header.background};
  padding: ${pxToRem(15)};
`;

const ImgLogo = styled.img`
  width: ${pxToRem(100)};
  margin: 0 auto;
`;

const Img = styled.img`
  max-width: 55%;
  margin: 22vh auto 40px;
`;

const Section = styled.section`
  min-width: 300px;
  text-align: center;
  line-height: 1.3;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
`;

const Text = styled.p`
  margin-top: 5px;
`;

const BtnBack = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 4px;
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
`;
