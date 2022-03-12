import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';

const Error404 = () => {
  const theme = useTheme();
  // TODO: 404이미지 다크모드 적용하기 위해 theme 생성
  return (
    <>
      <PageTitle title="Page Not found" />
      <Header>
        <Link href="/" passHref>
          <a>
            <ImgLogo src={theme.logo.src} alt="웰커밍 로고" />
          </a>
        </Link>
      </Header>
      <Section>
        <Img src={theme.error.error404} alt="404에러 이미지" />
        <Title>요청하신 페이지를 찾을 수 없습니다.</Title>
        <Text>입력한 주소를 다시 한 번 확인해주세요.</Text>
        <Link href="/" passHref>
          <BtnBack>이전 페이지로 돌아가기</BtnBack>
        </Link>
      </Section>
    </>
  );
};

export default Error404;

const Header = styled.header`
  background-color: rgba(255, 255, 255, 0.5);
  padding: ${pxToRem(15)};
`;

const ImgLogo = styled.img`
  width: ${pxToRem(110)};
  margin: 0 auto;
`;

const Section = styled.section`
  min-width: 300px;
  text-align: center;
  line-height: 1.3;
`;

const Img = styled.img`
  max-width: 55%;
  margin: 22vh auto 40px;
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
