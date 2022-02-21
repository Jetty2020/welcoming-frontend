import styled from '@emotion/styled';
import Link from 'next/link';
import { pxToRem } from '@utils/pxToRem';
import { Cart, HamburgerMenu, Home, Person, Search } from 'public/icons';
import { GRAY_900 } from '@constants/colors';

export const Navigation = () => {
  return (
    <>
      <Header>
        <h1 className="sr-only">어서와 우리집</h1>
        <HeaderRow>
          <Link href="/" passHref>
            <LinkLogo>
              <img src="/logo/logo_txt_b.png" alt="어서와 우리집 로고" />
            </LinkLogo>
          </Link>
          <ListWish>
            {/* <li>
              <Link href="/" passHref>
                <a>
                  <WishList />
                  <span className="sr-only">위시리스트</span>
                </a>
              </Link>
            </li> */}
            <li>
              <Link href="/" passHref>
                <a>
                  <Cart />
                  <span className="sr-only">장바구니</span>
                </a>
              </Link>
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
                <LinkMenu>카테고리</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>베스트</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>스타일링팁</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>실속인테리어</LinkMenu>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <LinkMenu>오늘의딜</LinkMenu>
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
      <NavBar>
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

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.1);
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
    fill: ${GRAY_900};
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
  color: ${GRAY_900};
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
