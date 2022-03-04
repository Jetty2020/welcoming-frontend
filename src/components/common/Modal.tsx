import styled from '@emotion/styled';
import React, { ReactChild, useEffect } from 'react';
import { pxToRem } from '@utils/pxToRem';

interface ModalProps {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  children: ReactChild;
}

interface IsShowModalProps {
  isShowModal: boolean;
}

export const Modal = ({
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
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  padding: ${pxToRem(12)} 0 ${pxToRem(30)};
  background-color: ${({ theme }) => theme.background.default};
  transform: ${({ isShowModal }) =>
    isShowModal ? 'translate(0)' : 'translateY(100%)'};
  transition: transform 1s;
`;
