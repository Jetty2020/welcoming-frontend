import styled from '@emotion/styled';
import Link from 'next/link';
import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';
import { Cart, DarkIcon, LightIcon, Search } from 'public/icons';
import { EmotionProps } from 'src/types';
import { GRAY_400 } from '@constants/colors';

export const DesktopNav = ({ className }: EmotionProps) => {
  return (
    <Header className={className}>
      <h1 className="sr-only">어서와 우리집</h1>
      <HeaderRow>
        <Link href="/" passHref>
          <LinkLogo>
            <img src="/logo/logo_txt.png" alt="어서와 우리집 로고" />
          </LinkLogo>
        </Link>
        <ListUserMenu>
          <li>
            <Link href="/" passHref>
              <a>로그인</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>회원가입</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>고객센터</a>
            </Link>
          </li>
        </ListUserMenu>
      </HeaderRow>
      <HeaderRow>
        <nav>
          <ListMenu>
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
          </ListMenu>
        </nav>
        <LabelSearch htmlFor="search">
          <input type="search" placeholder="검색어를 입력해주세요." />
          <BtnSearch type="button">
            <Search />
          </BtnSearch>
        </LabelSearch>
        <ListBtns>
          <li>
            <Link href="/" passHref>
              <a>
                <Cart />
                <span className="sr-only">장바구니</span>
              </a>
            </Link>
          </li>
          <li>
            <BtnDarkMode type="button" onClick={() => isDark(!isDark())}>
              {useReactiveVar(isDark) ? <DarkIcon /> : <LightIcon />}
            </BtnDarkMode>
          </li>
        </ListBtns>
      </HeaderRow>
    </Header>
  );
};

DesktopNav.defaultProps = {
  className: '',
};

const Header = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  min-width: 850px;
  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.1);
`;

const HeaderRow = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;

const LinkLogo = styled.a`
  display: block;
  width: 200px;
`;

const ListUserMenu = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;

  & li + li {
    margin-left: 15px;
  }
`;

const ListMenu = styled.ul`
  display: flex;
  padding: 10px 30px 10px 0;

  & li + li {
    margin-left: 30px;
  }
`;

const LinkMenu = styled.a``;

const ListBtns = styled.ul`
  display: flex;

  & li {
    width: 20px;
  }
`;

const LabelSearch = styled.label`
  display: flex;
  align-items: center;
  margin-right: 15px;
  padding: 0 15px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.input.background};

  & input {
    padding: 10px 0;
    border: 0;
    background: none;
  }

  & input::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const BtnSearch = styled.button`
  width: 18px;
`;

const BtnDarkMode = styled.button`
  width: 20px;
  margin-left: 15px;
`;
