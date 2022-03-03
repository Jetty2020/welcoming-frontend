import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';
import { ChevronRight } from 'public/icons';

export const WelcomeDeal = () => {
  return (
    <Section>
      <ContainerTitle>
        <div>
          <Title>웰컴딜</Title>
          <SubTitle>일주일 한정 특가</SubTitle>
        </div>
        <Link href="/" passHref>
          <AnchorMore>
            더보기 <ChevronRight />
          </AnchorMore>
        </Link>
      </ContainerTitle>
      <ContainerCountDay>
        <Label htmlFor="countDay">
          <Progress id="countDay" max="100" value="70" />
          D-Day
        </Label>
      </ContainerCountDay>
    </Section>
  );
};

const Section = styled.section`
  margin: ${pxToRem(40)} auto 0;
  max-width: ${pxToRem(1200)};
  padding: 0 15px;
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-bottom: 5px;
  font-size: ${({ theme }) => pxToRem(theme.title.fontSize)};
  font-weight: ${({ theme }) => theme.title.fontWeight};
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.lighter};
  font-size: 14px;
`;

const AnchorMore = styled.a`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;

  & svg {
    width: 14px;
    margin-left: 5px;
    vertical-align: baseline;
  }
`;

const ContainerCountDay = styled.div`
  margin: 10px 0;
`;

const Label = styled.label`
  display: grid;
  grid-template-columns: 85% 15%;
  width: 100%;
  color: ${({ theme }) => theme.text.primary};
  font-size: 14px;
  text-align: right;
`;

const Progress = styled.progress`
  width: 100%;
`;
