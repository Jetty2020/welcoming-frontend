import { useEffect, useRef, useState } from 'react';

export const useScrollY = () => {
  const scrollY = useRef<number>(0);
  const [isScroll, setIsScroll] = useState<boolean>(false);
  const [isUpward, setIsUpward] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    window.addEventListener('scroll', () => {
      if (mounted) {
        if (window.pageYOffset > 10) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
        if (window.pageYOffset < scrollY.current) {
          setIsUpward(true);
        } else {
          setIsUpward(false);
        }
        scrollY.current = window.pageYOffset;
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { isScroll, isUpward };
};
