import { ReactChild } from 'react';

export interface ModalProps {
  isShowModal: boolean;
  setIsShowModal: (value: boolean) => void;
  children: ReactChild;
}

export interface IsShowModalProps {
  isShowModal: boolean;
}
