import styled from '@emotion/styled';
import { useState } from 'react';
import { mediaQuery } from '../../styles/theme';

export const Carousel = () => {
  const dataLength = 3;
  const transTime = 0.5;
  const [xPos, setX] = useState<number>(-100);
  const [btnDis, setBtnDis] = useState<boolean>(false);
  const [trans, setTrans] = useState<string>(`${transTime}s ease`);

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
    }, transTime * 1000);
  };
  const data = [
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16424112974921.webp',
      moImg:
        'https://welcoming-2022.s3.amazonaws.com/1642426904309mobile1.jpeg',
    },
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16424291927202.webp',
      moImg:
        'https://welcoming-2022.s3.amazonaws.com/1642429256688mobile2.jpeg',
    },
    {
      deImg: 'https://welcoming-2022.s3.amazonaws.com/16424292935023.webp',
      moImg:
        'https://welcoming-2022.s3.amazonaws.com/1642429314381mobile3.jpeg',
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
  @media (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    height: 270px;
    object-fit: cover;
    object-position: center;
  }
  @media (min-width: ${({ theme }) => theme.mediaQuery.laptop}) {
    height: 380px;
  }
`;
