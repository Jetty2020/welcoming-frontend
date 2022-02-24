import { useEffect, useRef, useState } from 'react';

export const useScrollY = () => {
  const [isScroll, setIsScroll] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', () => {
      if (mounted) {
        if (window.pageYOffset > 10) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { isScroll };
};
