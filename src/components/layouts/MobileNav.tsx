import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { pxToRem } from '@utils/pxToRem';
import Cart from 'public/icons/cart.svg';
import DarkSVG from 'public/icons/dark-icon.svg';
import LightSVG from 'public/icons/light-icon.svg';
import Search from 'public/icons/search.svg';
import HamburgerMenu from 'public/icons/hamburger-menu.svg';
import Home from 'public/icons/home.svg';
import Person from 'public/icons/person.svg';
import { isDark } from '@apollo';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';
import { ROUTES } from '@constants/routes';

export const MobileNav = ({ className }: EmotionProps) => {
  const theme = useTheme();
  const { isScroll } = useScrollY();

  return (
    <>
      <Header className={className} data-scroll={isScroll}>
        <h1 className="sr-only">어서와 우리집</h1>
        <HeaderRow>
          <Link href={ROUTES.home} passHref>
            <LinkLogo>
              <ImgLogo src={theme.logo.src} alt="어서와 우리집 로고" />
            </LinkLogo>
          </Link>
          <ListWish>
            <li>
              <Link href={ROUTES.cart} passHref>
                <a>
                  <IconCart />
                  <span className="sr-only">장바구니</span>
                </a>
              </Link>
            </li>
            <li>
              <button type="button" onClick={() => isDark(!isDark())}>
                {useReactiveVar(isDark) ? <IconDark /> : <IconLight />}
              </button>
            </li>
          </ListWish>
        </HeaderRow>
        <nav>
          <ListMenu>
            <ItemMenu>
              <Link href={ROUTES.home} passHref>
                <LinkMenu>홈</LinkMenu>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link href={ROUTES.best} passHref>
                <LinkMenu>베스트</LinkMenu>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link href={ROUTES.welcomeDeal} passHref>
                <LinkMenu>웰컴딜</LinkMenu>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link href={ROUTES.events} passHref>
                <LinkMenu>최신 기획전</LinkMenu>
              </Link>
            </ItemMenu>
            <ItemMenu>
              <Link href={ROUTES.events} passHref>
                <LinkMenu>기획전</LinkMenu>
              </Link>
            </ItemMenu>
          </ListMenu>
        </nav>
      </Header>
      <NavBar className={className}>
        <ListNav>
          <li>
            <Link href={ROUTES.home} passHref>
              <AnchorMenu>
                <Home />홈
              </AnchorMenu>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.category} passHref>
              <AnchorMenu>
                <HamburgerMenu />
                카테고리
              </AnchorMenu>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.search} passHref>
              <AnchorMenu>
                <Search />
                검색
              </AnchorMenu>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.myPage} passHref>
              <AnchorMenu>
                <Person />
                마이페이지
              </AnchorMenu>
            </Link>
          </li>
        </ListNav>
      </NavBar>
    </>
  );
};

MobileNav.defaultProps = {
  className: '',
};

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(2px);
  background-color: ${({ theme }) => theme.header.backgroundBlur};
  transition: all 0.5s ease;

  &[data-scroll='true'] {
    background-color: ${({ theme }) => theme.header.background};
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LinkLogo = styled.a`
  display: block;
  padding: ${pxToRem(15)};
`;

const ImgLogo = styled.img`
  height: ${pxToRem(40)};
`;

const ListWish = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  right: ${pxToRem(26)};

  & li + li {
    margin-left: ${pxToRem(20)};
  }
`;

const IconCart = styled(Cart)`
  width: ${pxToRem(22)};
  fill: ${({ theme }) => theme.text.default};
  vertical-align: bottom;
`;

const IconDark = styled(DarkSVG)`
  width: ${pxToRem(20)};
  vertical-align: bottom;
`;

const IconLight = styled(LightSVG)`
  width: ${pxToRem(20)};
  vertical-align: bottom;
`;
const ListMenu = styled.ul`
  overflow-x: auto;
  display: flex;
`;

const ItemMenu = styled.li`
  flex: 1;
  min-width: fit-content;
  text-align: center;
`;

const LinkMenu = styled.a`
  display: block;
  margin: 0 ${pxToRem(10)};
  padding: ${pxToRem(10)} 0 ${pxToRem(7)};
  border-bottom: ${pxToRem(3)} solid transparent;
  font-size: ${pxToRem(15)};
  font-weight: 600;
  color: ${({ theme }) => theme.text.default};

  &.active {
    border-color: ${({ theme }) => theme.text.default};
  }
`;

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const ListNav = styled.ul`
  display: flex;
  background-color: ${({ theme }) => theme.background.default};

  & li {
    width: 100%;
  }
`;

const AnchorMenu = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${pxToRem(12)} 0;
  font-size: ${pxToRem(12)};

  & svg {
    width: ${pxToRem(22)};
    margin-bottom: ${pxToRem(6)};
  }
`;
