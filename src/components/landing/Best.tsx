import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { useState } from 'react';
import { pxToRem } from '@utils/pxToRem';
import { ChevronRight } from 'public/icons';
import Caret from 'public/icons/caret-down.svg';
import { Modal } from '@components/common/Modal';
import { PRIMARY_600, PRIMARY_800, ERROR } from '@constants/colors';

const fakeData = [0, 1, 2, 3, 4, 5, 6];

export const Best = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <Section>
      <ContainerTitle>
        <div>
          <Title>베스트</Title>
          <SubTitle>어서와 우리집 베스트 TOP 100</SubTitle>
        </div>
        <Link href="/" passHref>
          <AnchorMore>
            더보기 <ChevronRight />
          </AnchorMore>
        </Link>
      </ContainerTitle>
      <BtnOpenFilter type="button" onClick={() => setIsShowModal(true)}>
        인기순
        <IconCaret />
      </BtnOpenFilter>
      <Modal isShowModal={isShowModal} setIsShowModal={setIsShowModal}>
        <>
          <TItleFilter>정렬</TItleFilter>
          <ul>
            <ItemFilter>
              <BtnFilter type="button">낮은가격순</BtnFilter>
            </ItemFilter>
            <ItemFilter>
              <BtnFilter type="button">높은가격순</BtnFilter>
            </ItemFilter>
            <ItemFilter>
              <BtnFilter type="button">최신순</BtnFilter>
            </ItemFilter>
            <ItemFilter>
              <BtnFilter type="button">인기순</BtnFilter>
            </ItemFilter>
            <ItemFilter>
              <BtnFilter type="button">많은 리뷰순</BtnFilter>
            </ItemFilter>
          </ul>
        </>
      </Modal>
      <List>
        {fakeData.map((item) => {
          return (
            <Item key={`best-list-${uuidv4()}`}>
              <Link href="/" passHref>
                <a>
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
                </a>
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
    margin-top: ${pxToRem(100)};
    padding: 0 ${pxToRem(30)};
  }
`;

const ContainerTitle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: ${pxToRem(2)};
    position: absolute;
    bottom: ${pxToRem(-12)};
    background-color: ${PRIMARY_600};
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    flex-direction: column;
    position: absolute;
    top: ${pxToRem(10)};
    left: ${pxToRem(40)};

    &::after {
      display: none;
    }
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
    margin: ${pxToRem(10)} 0 ${pxToRem(15)};
    font-size: ${pxToRem(16)};
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

const BtnOpenFilter = styled.button`
  margin-top: ${pxToRem(22)};
  padding: ${pxToRem(6)} ${pxToRem(6)} ${pxToRem(6)} ${pxToRem(10)};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.text.default};
  font-size: ${pxToRem(14)};
  color: ${({ theme }) => theme.background.default};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    position: absolute;
    top: ${pxToRem(-49)};
    right: ${pxToRem(30)};
    margin: 0;
  }
`;

const IconCaret = styled(Caret)`
  margin-left: ${pxToRem(5)};
  vertical-align: middle;
`;

const TItleFilter = styled.p`
  padding: ${pxToRem(8)} 0;
  font-weight: 600;
  text-align: center;
`;

const ItemFilter = styled.li`
  padding: ${pxToRem(10)} ${pxToRem(15)};
`;

const BtnFilter = styled.button`
  font-size: ${pxToRem(16)};
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${pxToRem(20)} ${pxToRem(10)};
  margin-top: ${pxToRem(10)};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: grid;
    gap: ${pxToRem(50)} ${pxToRem(20)};
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Item = styled.li`
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
  }
`;

const Img = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ddd;
`;

const Info = styled.div`
  padding: ${pxToRem(10)} ${pxToRem(5)};
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
