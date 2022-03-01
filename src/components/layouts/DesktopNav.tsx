import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';
import { Cart, DarkIcon, LightIcon, Search } from 'public/icons';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';
import { GRAY_900 } from '@constants/colors';
import { pxToRem } from '@utils/pxToRem';

export const DesktopNav = ({ className }: EmotionProps) => {
  const theme = useTheme();
  const { isScroll, isUpward } = useScrollY();

  return (
    <Header className={className} data-scroll={isScroll} data-upward={isUpward}>
      <h1 className="sr-only">어서와 우리집</h1>
      <HeaderRow>
        <Link href="/" passHref>
          <LinkLogo>
            <img src={theme.logo.src} alt="어서와 우리집 로고" />
          </LinkLogo>
        </Link>
        <ListUserMenu>
          <li>
            <Link href="/auth/sign-in" passHref>
              <a>로그인</a>
            </Link>
          </li>
          <li>
            <Link href="/auth/sign-up" passHref>
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
                <a>홈</a>
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
                <a>웰컴딜</a>
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
  padding-top: ${pxToRem(10)};
  backdrop-filter: blur(2px);
  background-color: ${({ theme }) => theme.header.backgroundBlur};
  transition: all 0.5s ease;
  transform: translateY(${pxToRem(-104)});

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
`;

const LinkLogo = styled.a`
  display: block;
  width: ${pxToRem(200)};
  margin: ${pxToRem(10)} 0;
`;

const ListUserMenu = styled.ul`
  display: flex;
  align-items: center;
  position: absolute;
  top: ${pxToRem(20)};
  right: ${pxToRem(15)};
  font-size: ${pxToRem(14)};
  font-weight: 600;

  & li + li {
    margin-left: ${pxToRem(15)};
  }
`;

const ListMenu = styled.ul`
  display: flex;
  font-size: ${pxToRem(18)};
  font-weight: 600;

  & a {
    display: block;
    padding: ${pxToRem(15)} ${pxToRem(10)} ${pxToRem(12)};
    box-sizing: border-box;
    border-bottom: ${pxToRem(3)} solid transparent;
    transition: border-color 0.3s;
  }

  & a:hover,
  & a:active {
    border-color: ${({ theme }) => theme.text.default};
  }

  & li.recentEvent {
    @media screen and (max-width: ${pxToRem(860)}) {
      display: none;
    }
  }
`;

const ListBtns = styled.ul`
  display: flex;

  & li {
    width: ${pxToRem(20)};
  }
`;

const LabelSearch = styled.label`
  display: flex;
  align-items: center;
  margin: 0 ${pxToRem(15)} 0 ${pxToRem(30)};
  padding: 0 ${pxToRem(15)};
  border-radius: ${pxToRem(30)};
  background-color: ${({ theme }) => theme.input.background};

  & input {
    padding: ${pxToRem(10)} 0;
    border: 0;
    background: none;
  }

  & input::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const BtnSearch = styled.button`
  width: ${pxToRem(18)};

  & svg {
    fill: ${GRAY_900};
  }
`;

const BtnDarkMode = styled.button`
  width: ${pxToRem(20)};
  margin-left: ${pxToRem(15)};
`;
