import styled from '@emotion/styled';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { mediaQuery } from '@styles/theme';
import { ChevronLeft, ChevronRight } from 'public/icons';
import { WHITE } from 'src/constants/colors';
import { pxToRem } from '@utils/pxToRem';

const data = [
  {
    deImg: '/images/landing/welcom_deal_banner.png',
    moImg: '/images/landing/welcom_deal_banner_m.png',
  },
  {
    deImg: '/images/landing/living_week_banner.png',
    moImg: '/images/landing/living_week_banner_m.png',
  },
  {
    deImg: 'https://welcoming-2022.s3.amazonaws.com/16430329130963.jpg',
    moImg: 'https://welcoming-2022.s3.amazonaws.com/16430329305543m.jpg',
  },
];

export const Carousel = () => {
  const dataLength = data.length;
  const transTime = 0.5;
  const [xPos, setX] = useState<number>(-1);
  const [btnDis, setBtnDis] = useState<boolean>(false);
  const [trans, setTrans] = useState<string>('none');
  const [imgPage, setImgPage] = useState<number>(1);
  const prevImg = () => {
    setBtnDis(true);
    setTrans(`${transTime}s ease`);
    if (xPos !== Math.round(xPos)) {
      setX((curr) => Math.round(curr));
    } else {
      setX((curr) => curr + 1);
    }
    setTimeout(() => {
      setBtnDis(false);
      if (xPos >= -1) {
        setTrans('none');
        setX(-dataLength);
        setImgPage(data.length);
      } else if (
        Math.floor(startX) + 2 === Math.round(xPos) ||
        xPos === Math.round(xPos)
      ) {
        setImgPage((curr) => curr - 1);
      }
      setTrans('none');
    }, transTime * 1000);
  };
  const nextImg = () => {
    setBtnDis(true);
    setTrans(`${transTime}s ease`);
    if (xPos !== Math.round(xPos)) {
      setX((curr) => Math.round(curr));
    } else {
      setX((curr) => curr - 1);
    }
    setTimeout(() => {
      setBtnDis(false);
      if (xPos <= -dataLength) {
        setTrans('none');
        setX(-1);
        setImgPage(1);
      } else if (
        Math.floor(startX) === Math.round(xPos) ||
        xPos === Math.round(xPos)
      ) {
        setImgPage((curr) => curr + 1);
      }
      setTrans('none');
    }, transTime * 1000);
  };

  // drag
  const [isDrag, setIsDrag] = useState(false);
  const [startX, setStartX] = useState<number>(0);

  const onMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();
    setIsDrag(true);
    setStartX(xPos - e.pageX / window.innerWidth);
  };

  const onMouseEnd = () => {
    if (Math.round(xPos) > xPos) {
      prevImg();
    } else if (Math.round(xPos) < xPos) {
      nextImg();
    }
    setIsDrag(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (isDrag) {
      setX(+(startX + e.pageX / window.innerWidth).toFixed(2));
    }
  };

  // mobile
  const onTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    setIsDrag(true);
    setStartX(xPos - e.touches[0].pageX / window.innerWidth);
  };

  const onTouchEnd = () => {
    if (Math.round(xPos) > xPos) {
      prevImg();
    } else if (Math.round(xPos) < xPos) {
      nextImg();
    }
    setIsDrag(false);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (isDrag) {
      setX(+(startX + e.touches[0].pageX / window.innerWidth).toFixed(2));
    }
  };

  return (
    <CarouselCon>
      <h2 className="sr-only">이벤트 슬라이드</h2>
      <InnerContainer
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseEnd}
        onMouseLeave={onMouseEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchEnd}
        style={{
          transform: `translatex(${xPos * 100}vw)`,
          transition: `${trans}`,
        }}
      >
        <li>
          <CarouselPic>
            <source
              media={`(min-width:${mediaQuery.tablet})`}
              srcSet={data[data.length - 1].deImg}
            />
            <CarouselImg src={data[data.length - 1].moImg} alt="carouselImg" />
          </CarouselPic>
        </li>
        {data.map((ele) => {
          return (
            <li key={`carousel-list-${uuidv4()}`}>
              <CarouselPic>
                <source
                  media={`(min-width:${mediaQuery.tablet})`}
                  srcSet={ele.deImg}
                />
                <CarouselImg src={ele.moImg} alt="carouselImg" />
              </CarouselPic>
            </li>
          );
        })}
        <li>
          <CarouselPic>
            <source
              media={`(min-width:${mediaQuery.tablet})`}
              srcSet={data[0].deImg}
            />
            <CarouselImg src={data[0].moImg} alt="carouselImg" />
          </CarouselPic>
        </li>
      </InnerContainer>
      <PrevBtn type="button" onClick={prevImg} disabled={btnDis}>
        <ChevronLeft />
      </PrevBtn>
      <NextBtn type="button" onClick={nextImg} disabled={btnDis}>
        <ChevronRight />
      </NextBtn>
      <PageIndex>
        {imgPage}
        <PageSpan>/</PageSpan>
        {data.length}
      </PageIndex>
    </CarouselCon>
  );
};

const CarouselCon = styled.section`
  overflow-x: hidden;
  position: relative;
`;

const InnerContainer = styled.ul`
  display: flex;
`;

const CarouselPic = styled.picture`
  display: block;
  height: 100vh;
`;

const CarouselImg = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
`;

const CarouselBtn = styled.button`
  position: absolute;
  top: 50%;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  transform: translateY(-50%);
  transition: background 0.3s ease;

  & svg {
    width: ${pxToRem(20)};
    fill: ${WHITE};
    vertical-align: middle;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const PrevBtn = styled(CarouselBtn)`
  left: ${pxToRem(20)};
  padding: ${pxToRem(15)} ${pxToRem(17)} ${pxToRem(15)} ${pxToRem(13)};
`;

const NextBtn = styled(CarouselBtn)`
  right: ${pxToRem(20)};
  padding: ${pxToRem(15)} ${pxToRem(13)} ${pxToRem(15)} ${pxToRem(17)};
`;

const PageIndex = styled.div`
  position: absolute;
  bottom: ${pxToRem(100)};
  right: ${pxToRem(30)};
  padding: ${pxToRem(5)} ${pxToRem(10)};
  border-radius: ${pxToRem(20)};
  background-color: rgba(0, 0, 0, 0.4);
  color: ${WHITE};
  text-align: center;
`;

const PageSpan = styled.span`
  margin: 0 ${pxToRem(3)};
`;
