import styled from '@emotion/styled';
import Link from 'next/link';
import { GRAY_600 } from '@constants/colors';
import { ChevronLeft, ChevronRight } from 'public/icons';

const data = [
  { img: '/images/landing/furniture.png', name: '가구' },
  { img: '/images/landing/fabric.png', name: '패브릭' },
  { img: '/images/landing/lighting.png', name: '조명' },
  { img: '/images/landing/home_appliances.png', name: '가전' },
  { img: '/images/landing/kitchen.png', name: '주방용품' },
  { img: '/images/landing/plant.png', name: '데코/식물' },
  { img: '/images/landing/closet.png', name: '수납/정리' },
  { img: '/images/landing/household_goods.png', name: '생활용품' },
];

export const Category = () => {
  return (
    <CategorySec>
      <h2 className="sr-only">카테고리</h2>
      <CategoryCon>
        {data.map((ele) => (
          <li key={Math.random()}>
            <Link href="/" passHref>
              <CategoryAnc>
                <CategoryImg src={ele.img} alt={ele.name} />
                <CategoryName>{ele.name}</CategoryName>
              </CategoryAnc>
            </Link>
          </li>
        ))}
      </CategoryCon>
    </CategorySec>
  );
};

const CategorySec = styled.section`
  margin: 40px 10px 0;
`;

const CategoryCon = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* grid-template-rows: minmax(120px, 25vw); */
`;

const CategoryAnc = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vw;
  min-height: 120px;
`;

const CategoryImg = styled.img`
  width: 60px;
  margin-bottom: 16px;
`;

const CategoryName = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.text.lighter};
  text-align: center;
`;
