import styled from '@emotion/styled';
import { useState } from 'react';
import { mediaQuery } from '../../styles/theme';

export const Carousel = () => {
  const dataLength = 3;
  const transTime = 0.5;
  const [xPos, setX] = useState<number>(-100);
  const [btnDis, setBtnDis] = useState<boolean>(false);
  const [trans, setTrans] = useState<string>('none');
  const prevImg = () => {
    setBtnDis(true);
    setTrans(`${transTime}s ease`);
    setX((curr) => curr + 100);
    setTimeout(() => {
      setBtnDis(false);
      if (xPos === -100) {
        setTrans('none');
        setX(dataLength * -100);
      }
      setTrans('none');
    }, transTime * 1000);
  };
  const nextImg = () => {
    setBtnDis(true);
    setTrans(`${transTime}s ease`);
    setX((curr) => curr - 100);
    setTimeout(() => {
      setBtnDis(false);
      if (xPos === dataLength * -100) {
        setTrans('none');
        setX(-100);
      }
      setTrans('none');
    }, transTime * 1000);
  };
  const data = [
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16430327323051.jpg',
      moImg: 'https://welcoming-2022.s3.amazonaws.com/16430328647101m.jpg',
    },
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16430328768812.jpg',
      moImg: 'https://welcoming-2022.s3.amazonaws.com/16430328983252m.jpg',
    },
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16430329130963.jpg',
      moImg: 'https://welcoming-2022.s3.amazonaws.com/16430329305543m.jpg',
    },
  ];
  return (
    <CarouselCon>
      <InnerContainer
        style={{
          transform: `translatex(${xPos}vw)`,
          transition: `${trans}`,
        }}
      >
        <picture>
          <source
            media={`(min-width:${mediaQuery.tablet})`}
            srcSet={data[data.length - 1].deImg}
          />
          <CarouselImg srcSet={data[data.length - 1].moImg} alt="carouselImg" />
        </picture>
        {data.map((ele) => {
          return (
            <picture key={`${ele.deImg.slice(-20, -10)}-img`}>
              <source
                media={`(min-width:${mediaQuery.tablet})`}
                srcSet={ele.deImg}
              />
              <CarouselImg srcSet={ele.moImg} alt="carouselImg" />
            </picture>
          );
        })}
        <picture>
          <source
            media={`(min-width:${mediaQuery.tablet})`}
            srcSet={data[0].deImg}
          />
          <CarouselImg srcSet={data[0].moImg} alt="carouselImg" />
        </picture>
      </InnerContainer>
      <button type="button" onClick={prevImg} disabled={btnDis}>
        &lt;
      </button>
      <button type="button" onClick={nextImg} disabled={btnDis}>
        &gt;
      </button>
    </CarouselCon>
  );
};

const CarouselCon = styled.div`
  overflow: hidden;
`;
const InnerContainer = styled.div`
  display: flex;
  width: 100vw;
`;
const CarouselImg = styled.img`
  width: 100vw;
  height: 100vh;
  @media (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    object-fit: cover;
    object-position: center;
  }
`;
