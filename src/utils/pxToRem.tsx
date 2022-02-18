import { ROOT_FONT_SIZE } from '../constants';

export const pxToRem = (num: number) => {
  return `${(num / ROOT_FONT_SIZE).toFixed(3)}rem`;
};
