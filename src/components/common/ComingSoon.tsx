import Link from 'next/link';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { pxToRem } from '@utils/pxToRem';

export const ComingSoon = () => {
  const theme = useTheme();

  return (
    <Section>
      <Img src={theme.comingSoon.src} alt="준비중 이미지" />
      <Title>현재 페이지는 준비중입니다.</Title>
      <Text>
        이용에 불편을 드려 죄송합니다.
        <br />
        빠른 시일 내에 이용하실 수 있도록 하겠습니다.
      </Text>
      <Link href="/" passHref>
        <LinkHome>홈으로 가기</LinkHome>
      </Link>
    </Section>
  );
};

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
  min-width: ${pxToRem(830)};
  width: 55%;
  max-width: ${pxToRem(430)};
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
