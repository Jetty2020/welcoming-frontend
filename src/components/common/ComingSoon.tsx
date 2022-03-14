import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

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
        <LinkBack>이전 페이지로 돌아가기</LinkBack>
      </Link>
    </Section>
  );
};

const Section = styled.section`
  min-width: 300px;
  padding: 100px 0;
  text-align: center;
  line-height: 1.5;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    padding: 200px 0;
  }
`;

const Img = styled.img`
  min-width: 280px;
  width: 55%;
  max-width: 430px;
  margin: 10vh auto 40px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  word-break: keep-all;
`;

const Text = styled.p`
  margin-top: 5px;
`;

const LinkBack = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 18px;
  border-radius: 4px;
  background: ${({ theme }) => theme.button.background};
  color: ${({ theme }) => theme.button.text};
`;
