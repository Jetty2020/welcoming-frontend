import styled from '@emotion/styled';
import React, { useEffect } from 'react';
import { pxToRem } from '@utils/pxToRem';
import { IsShowModalProps, ModalProps } from 'src/types';

export const CentralModal = ({
  isShowModal,
  setIsShowModal,
  children,
}: ModalProps) => {
  useEffect(() => {
    if (isShowModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isShowModal]);

  return (
    <Container>
      <Background
        isShowModal={isShowModal}
        onClick={() => setIsShowModal(false)}
      />
      <ContainerContent isShowModal={isShowModal}>{children}</ContainerContent>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 100;
`;

const Background = styled.div<IsShowModalProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: ${({ isShowModal }) => (isShowModal ? 'visible' : 'hidden')};
  background: rgba(46, 43, 41, 0.4);
  transition: visibility 0.1s;
`;

const ContainerContent = styled.div<IsShowModalProps>`
  overflow: hidden;
  position: fixed;
  left: 50%;
  bottom: 50%;
  visibility: ${({ isShowModal }) => (isShowModal ? 'visible' : 'hidden')};
  border-radius: ${pxToRem(20)};
  background-color: ${({ theme }) => theme.background.default};
  transform: translate(-50%);
`;