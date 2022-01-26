import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { mediaQuery } from 'src/styles/theme';
import ChevronLeft from 'public/icon/chevron-left.svg';
import ChevronRight from 'public/icon/chevron-right.svg';

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

export const Carousel = () => {
  const dataLength = data.length;
  const transTime = 0.5;
  const [xPos, setX] = useState<number>(-100);
  const [btnDis, setBtnDis] = useState<boolean>(false);
  const [trans, setTrans] = useState<string>('none');
  const [imgPage, setImgPage] = useState<number>(1);
  const prevImg = () => {
    setBtnDis(true);
    setTrans(`${transTime}s ease`);
    setX((curr) => curr + 100);
    setTimeout(() => {
      setBtnDis(false);
      if (xPos === -100) {
        setTrans('none');
        setX(dataLength * -100);
        setImgPage(data.length);
      } else {
        setImgPage((curr) => curr - 1);
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
        setImgPage(1);
      } else {
        setImgPage((curr) => curr + 1);
      }
      setTrans('none');
    }, transTime * 1000);
  };

  useEffect(() => {
    const auto = setTimeout(nextImg, 5000);
    return () => clearTimeout(auto);
  }, [xPos]);

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
      <PrevBtn type="button" onClick={prevImg} disabled={btnDis}>
        <ChevronLeft />
      </PrevBtn>
      <NextBtn type="button" onClick={nextImg} disabled={btnDis}>
        <ChevronRight />
      </NextBtn>
      <PageIndex>
        {imgPage} <PageSpan>/</PageSpan> {data.length}
      </PageIndex>
    </CarouselCon>
  );
};

const CarouselCon = styled.div`
  overflow: hidden;
  position: relative;
`;
const InnerContainer = styled.div`
  display: flex;
  width: 100vw;
`;
const CarouselImg = styled.img`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
`;
const CarouselBtn = styled.button`
  position: absolute;
  top: 50vh;
  border-radius: 50%;
  background: #0000006a;
  transform: translateY(-50%);
  & svg {
    fill: #fff;
    width: 20px;
  }
  &:hover {
    background: #00000094;
    transition: 0.3s ease;
  }
`;
const PrevBtn = styled(CarouselBtn)`
  left: 20px;
  padding: 15px 16px 15px 14px;
`;
const NextBtn = styled(CarouselBtn)`
  right: 20px;
  padding: 15px 14px 15px 16px;
`;
const PageIndex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 100px;
  right: 30px;
  box-sizing: border-box;
  width: 60px;
  height: 30px;
  padding-top: 3px;
  border-radius: 15px;
  background: #0000006a;
  line-height: 30px;
  color: #fff;
  font-weight: 500;
`;

const PageSpan = styled.span`
  line-height: 30px;
  margin: 0 5px;
`;
