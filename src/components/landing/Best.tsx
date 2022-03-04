import styled from '@emotion/styled';
import Link from 'next/link';
import { useState } from 'react';
import { pxToRem } from '@utils/pxToRem';
import { ChevronRight } from 'public/icons';
import Caret from 'public/icons/caret-down.svg';
import { Modal } from '@components/common/Modal';

export const Best = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <Section>
      <ContainerTitle>
        <Title>베스트</Title>
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
  font-size: ${({ theme }) => pxToRem(theme.title.mobileFontSize)};
  font-weight: ${({ theme }) => theme.title.fontWeight};
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

const BtnOpenFilter = styled.button`
  margin-top: ${pxToRem(10)};
  padding: ${pxToRem(6)} ${pxToRem(6)} ${pxToRem(5)} ${pxToRem(10)};
  border-radius: ${pxToRem(20)};
  background-color: ${({ theme }) => theme.text.default};
  font-size: ${pxToRem(14)};
  color: ${({ theme }) => theme.background.default};
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
