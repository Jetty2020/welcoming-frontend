interface DesktopNavProps {
  className?: string;
}

export const DesktopNav = ({ className }: DesktopNavProps) => {
  return <div className={className}>DesktopNav</div>;
};

DesktopNav.defaultProps = {
  className: '',
};
