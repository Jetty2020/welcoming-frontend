import { EmotionProps } from 'src/types';

export const DesktopNav = ({ className }: EmotionProps) => {
  return <div className={className}>DesktopNav</div>;
};

DesktopNav.defaultProps = {
  className: '',
};
