import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';

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
    <Section>
      <h2 className="sr-only">카테고리</h2>
      <List>
        {data.map((ele) => (
          <li key={Math.random()}>
            <Link href="/" passHref>
              <Anchor>
                <Img src={ele.img} alt={ele.name} />
                <Name>{ele.name}</Name>
              </Anchor>
            </Link>
          </li>
        ))}
      </List>
    </Section>
  );
};

const Section = styled.section`
  margin-top: ${pxToRem(20)};
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: ${pxToRem(10)};
`;

const Anchor = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 25vw;
`;

const Img = styled.img`
  width: 60%;
  max-width: ${pxToRem(80)};
  margin-bottom: ${pxToRem(14)};
`;

const Name = styled.span`
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(13)};
  font-weight: 500;
`;
