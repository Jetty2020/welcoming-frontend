import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';
import { Cart, DarkIcon, LightIcon, Search } from 'public/icons';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';

export const DesktopNav = ({ className }: EmotionProps) => {
  const theme = useTheme();
  const { isScroll, isUpward } = useScrollY();

  return (
    <Header className={className} data-scroll={isScroll} data-upward={isUpward}>
      <h1 className="sr-only">어서와 우리집</h1>
      <HeaderRow>
        <Link href="/" passHref>
          <LinkLogo>
            <img src={theme.header.logo} alt="어서와 우리집 로고" />
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
                <a>스토어홈</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>카테고리</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>베스트</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>오늘의딜</a>
              </Link>
            </li>
            <li className="recentEvent">
              <Link href="/" passHref>
                <a>최신 기획전</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>기획전</a>
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
  padding-top: 10px;
  backdrop-filter: blur(2px);
  background-color: ${({ theme }) => theme.header.backgroundBlur};
  transition: all 0.5s ease;
  transform: translateY(-104px);

  &[data-scroll='true'] {
    background-color: ${({ theme }) => theme.header.background};
  }

  &[data-upward='true'],
  &:hover {
    transform: translateY(0);
  }
`;

const HeaderRow = styled.div`
  display: flex;
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
  top: 20px;
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

  & .recentEvent {
    @media screen and (max-width: 860px) {
      display: none;
    }
  }
`;

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
