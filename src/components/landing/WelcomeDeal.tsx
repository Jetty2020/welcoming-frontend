import { GRAY_500, PRIMARY_700 } from '@constants/colors';
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
        <ProgressBar>
          <ProgressValue progress-value={10} />
        </ProgressBar>
        <TextCountDay>D-Day</TextCountDay>
        <span>2022.02.21 ~ 03.12</span>
      </ContainerCountDay>
    </Section>
  );
};

const Section = styled.section`
  margin: ${pxToRem(40)} auto 0;
  max-width: ${pxToRem(1200)};
  padding: 0 ${pxToRem(15)};
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const Title = styled.h2`
  margin-bottom: ${pxToRem(5)};
  font-size: ${({ theme }) => pxToRem(theme.title.fontSize)};
  font-weight: ${({ theme }) => theme.title.fontWeight};
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(14)};
`;

const AnchorMore = styled.a`
  display: flex;
  align-items: center;
  font-size: ${pxToRem(14)};
  font-weight: 600;

  & svg {
    width: ${pxToRem(14)};
    margin-left: ${pxToRem(5)};
    vertical-align: baseline;
  }
`;

const ContainerCountDay = styled.div`
  margin: ${pxToRem(10)} 0;
  font-weight: 700;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 2px;
  margin-bottom: ${pxToRem(10)};
  background-color: ${GRAY_500};
`;

const TextCountDay = styled.span`
  margin-right: ${pxToRem(10)};
  color: ${({ theme }) => theme.text.primary};
`;

const ProgressValue = styled.div<{ 'progress-value': number }>`
  width: ${(props) => props['progress-value']}%;
  height: 100%;
  background-color: ${PRIMARY_700};
`;
