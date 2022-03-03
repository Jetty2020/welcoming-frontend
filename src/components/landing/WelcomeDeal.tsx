import {
  ERROR,
  GRAY_300,
  GRAY_500,
  PRIMARY_700,
  PRIMARY_800,
} from '@constants/colors';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { pxToRem } from '@utils/pxToRem';
import { ChevronRight } from 'public/icons';

const data = [0, 1, 2, 3, 4, 5, 6];

export const WelcomeDeal = () => {
  return (
    <Section>
      <ContainerTitle>
        <div>
          <Title>웰컴딜</Title>
          <SubTitle>일주일 한정 특가</SubTitle>
        </div>
        <CountTime>0일 00시 00분 00초</CountTime>
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
      <List>
        {data.map((item) => {
          return (
            <Item key={`product-list-${uuidv4()}`}>
              <Link href="/" passHref>
                <Anchor>
                  <Img>이미지 준비중</Img>
                  <Info>
                    <BrandName>브랜드 이름</BrandName>
                    <ProductName>
                      [상품명] 낮엔 소파, 밤엔 침대! 접이식 인기 소파베드 모음
                    </ProductName>
                    <Discount>50%</Discount>
                    <Price>157,000원</Price>
                    <ContainerReview>
                      <Rate>별점 4.5 </Rate>
                      <Review>리뷰 14,623</Review>
                    </ContainerReview>
                    <div>
                      <TagFreeShipping>무료배송</TagFreeShipping>
                      <TagEventPrice>특가</TagEventPrice>
                    </div>
                  </Info>
                </Anchor>
              </Link>
            </Item>
          );
        })}
      </List>
    </Section>
  );
};

const Section = styled.section`
  margin: ${pxToRem(40)} auto 0;
  max-width: ${pxToRem(1200)};
  padding: 0 ${pxToRem(15)};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    position: relative;
    padding: 0 ${pxToRem(30)};
  }
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    flex-direction: column;
    position: absolute;
    top: ${pxToRem(10)};
    left: ${pxToRem(40)};
  }
`;

const Title = styled.h2`
  margin-bottom: ${pxToRem(5)};
  font-size: ${({ theme }) => pxToRem(theme.title.mobileFontSize)};
  font-weight: ${({ theme }) => theme.title.fontWeight};
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    margin-bottom: ${pxToRem(8)};
    font-size: ${({ theme }) => pxToRem(theme.title.desktopFontSize)};
  }
`;

const SubTitle = styled.p`
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(14)};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    font-size: ${pxToRem(16)};
  }
`;
const CountTime = styled.span`
  margin: ${pxToRem(10)} 0 ${pxToRem(20)};
  font-size: ${pxToRem(18)};
  letter-spacing: -0.02em;

  &::before {
    content: '';
    display: inline-block;
    width: ${pxToRem(12)};
    height: ${pxToRem(12)};
    margin: 0 ${pxToRem(5)} ${pxToRem(1)} 0;
    background-color: ${({ theme }) => theme.background.primary};
    border-radius: 50%;
  }

  @media screen and (max-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: none;
  }
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

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    font-size: ${pxToRem(16)};
  }
`;

const ContainerCountDay = styled.div`
  margin: ${pxToRem(10)} 0 ${pxToRem(30)};
  font-weight: 700;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: none;
  }
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
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    margin-bottom: ${pxToRem(5)};
  }
`;

const ProgressValue = styled.div<{ 'progress-value': number }>`
  width: ${(props) => props['progress-value']}%;
  height: 100%;
  background-color: ${PRIMARY_700};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: grid;
    gap: ${pxToRem(50)} ${pxToRem(20)};
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Item = styled.li`
  & + & {
    margin-top: ${pxToRem(20)};
  }

  & + &::before {
    content: '';
    display: block;
    margin-bottom: ${pxToRem(20)};
    border-top: 1px solid ${GRAY_300};
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    &:nth-of-type(1) {
      grid-column: 2;
    }
    &:nth-of-type(2) {
      grid-column: 3;
    }
    &:nth-of-type(3) {
      grid-column: 4;
    }
    &:nth-of-type(4) {
      grid-column: 1;
    }
    &:nth-of-type(5) {
      grid-column: 2;
    }
    &:nth-of-type(6) {
      grid-column: 3;
    }
    &:nth-of-type(7) {
      grid-column: 4;
    }

    & + & {
      margin-top: 0;
    }
    & + &::before {
      display: none;
    }
  }
`;

const Anchor = styled.a`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${pxToRem(10)};
  min-height: calc(50vw - ${pxToRem(20)});

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    min-height: auto;
  }
`;

const Img = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ddd;
`;

const Info = styled.div`
  align-self: center;
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    padding: 0 ${pxToRem(5)};
  }
`;

const BrandName = styled.span`
  display: inline-block;
  margin-top: ${pxToRem(5)};
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(13)};
  font-weight: 600;
`;

const ProductName = styled.p`
  margin: ${pxToRem(10)} 0;
  line-height: 1.3;
`;

const Discount = styled.span`
  padding-right: ${pxToRem(5)};
  color: ${PRIMARY_800};
  font-size: ${pxToRem(17)};
  font-weight: 600;
`;

const Price = styled.span`
  font-size: ${pxToRem(17)};
  font-weight: 600;
`;

const ContainerReview = styled.div`
  margin: ${pxToRem(10)} 0;
  font-size: ${pxToRem(12)};
`;

const Rate = styled.span`
  color: ${PRIMARY_800};
`;

const Review = styled.span`
  color: ${({ theme }) => theme.text.lighter};
`;

const StyleTag = () => css`
  display: inline-block;
  margin: 0 ${pxToRem(5)} ${pxToRem(5)} 0;
  padding: ${pxToRem(5)} ${pxToRem(8)};
  border: 1px solid transparent;
  border-radius: ${pxToRem(20)};
  font-size: ${pxToRem(11)};
`;

const TagFreeShipping = styled.span`
  ${StyleTag}
  border-color: ${({ theme }) => theme.text.default};
`;

const TagEventPrice = styled.span`
  ${StyleTag}
  background-color: ${ERROR};
  color: ${({ theme }) => theme.background.default};
`;
