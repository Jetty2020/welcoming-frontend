import styled from '@emotion/styled';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { pxToRem } from '@utils/pxToRem';
import {
  Cart,
  DarkIcon,
  HamburgerMenu,
  Home,
  LightIcon,
  Person,
  Search,
} from 'public/icons';
import { isDark } from '@apollo';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';

export const MobileNav = ({ className }: EmotionProps) => {
  const { scrollY } = useScrollY();

  return (
    <>
      <Header className={className} data-scroll={scrollY > 10}>
        <h1 className="sr-only">어서와 우리집</h1>
        <HeaderRow>
          <Link href="/" passHref>
            <LinkLogo>
              <img src="/logo/logo_txt_b.png" alt="어서와 우리집 로고" />
            </LinkLogo>
          </Link>
          <ListWish>
            <li>
              <Link href="/" passHref>
                <a>
                  <Cart />
                  <span className="sr-only">장바구니</span>
                </a>
              </Link>
            </li>
            <li>
              <button type="button" onClick={() => isDark(!isDark())}>
                {useReactiveVar(isDark) ? <DarkIcon /> : <LightIcon />}
              </button>
            </li>
          </ListWish>
        </HeaderRow>
        <nav>
          <HeaderNav>
            <li>
              <Link href="/" passHref>
                <LinkMenu>스토어홈</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>베스트</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>오늘의딜</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>최신 기획전</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>기획전</LinkMenu>
              </Link>
            </li>
          </HeaderNav>
        </nav>
      </Header>
      <NavBar className={className}>
        <NavList>
          <li>
            <Link href="/" passHref>
              <BtnMenu>
                <Home />홈
              </BtnMenu>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnMenu>
                <HamburgerMenu />
                카테고리
              </BtnMenu>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnMenu>
                <Search />
                검색
              </BtnMenu>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <BtnMenu>
                <Person />
                마이페이지
              </BtnMenu>
            </Link>
          </li>
        </NavList>
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

  & img {
    height: ${pxToRem(40)};
  }
`;

const ListWish = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  right: ${pxToRem(20)};

  & svg {
    width: ${pxToRem(28)};
    vertical-align: bottom;
  }

  & button svg {
    width: ${pxToRem(24)};
  }

  & li + li {
    margin-left: ${pxToRem(16)};
  }
`;

const HeaderNav = styled.ul`
  overflow-x: auto;
  display: flex;

  & li {
    flex: 1;
    min-width: fit-content;
    text-align: center;
  }
`;

const LinkMenu = styled.a`
  display: block;
  padding: ${pxToRem(10)};
`;

const NavBar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const NavList = styled.ul`
  display: flex;
  background-color: ${({ theme }) => theme.background.default};

  & li {
    width: 100%;
  }
`;

const BtnMenu = styled.a`
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
