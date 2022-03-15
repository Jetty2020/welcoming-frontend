import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Link from 'next/link';
import { isDark } from '@apollo';
import { useReactiveVar } from '@apollo/client';
import Cart from 'public/icons/cart.svg';
import DarkIcon from 'public/icons/dark-icon.svg';
import LightIcon from 'public/icons/light-icon.svg';
import Search from 'public/icons/search.svg';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';
import { GRAY_900 } from '@constants/colors';
import { pxToRem } from '@utils/pxToRem';
import { ROUTES } from '@constants/routes';

export const DesktopNav = ({ className }: EmotionProps) => {
  const theme = useTheme();
  const { isScroll, isUpward } = useScrollY();

  return (
    <Header className={className} data-scroll={isScroll} data-upward={isUpward}>
      <h1 className="sr-only">어서와 우리집</h1>
      <HeaderRow>
        <Link href={ROUTES.home} passHref>
          <AnchorLogo>
            <img src={theme.logo.src} alt="어서와 우리집 로고" />
          </AnchorLogo>
        </Link>
        <ListUserMenu>
          <li>
            <Link href={ROUTES.signIn} passHref>
              <AnchorUserMenu>로그인</AnchorUserMenu>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.signUp} passHref>
              <AnchorUserMenu>회원가입</AnchorUserMenu>
            </Link>
          </li>
          <li>
            <Link href={ROUTES.csCenter} passHref>
              <AnchorUserMenu>고객센터</AnchorUserMenu>
            </Link>
          </li>
        </ListUserMenu>
      </HeaderRow>
      <HeaderRow>
        <nav>
          <ListMenu>
            <li>
              <Link href={ROUTES.home} passHref>
                <AnchorMenu>홈</AnchorMenu>
              </Link>
            </li>
            <li>
              <Link href={ROUTES.category} passHref>
                <AnchorMenu>카테고리</AnchorMenu>
              </Link>
            </li>
            <li>
              <Link href={ROUTES.best} passHref>
                <AnchorMenu>베스트</AnchorMenu>
              </Link>
            </li>
            <li>
              <Link href={ROUTES.welcomeDeal} passHref>
                <AnchorMenu>웰컴딜</AnchorMenu>
              </Link>
            </li>
            <li className="recentEvent">
              <Link href={ROUTES.events} passHref>
                <AnchorMenu>최신 기획전</AnchorMenu>
              </Link>
            </li>
            <li>
              <Link href={ROUTES.events} passHref>
                <AnchorMenu>기획전</AnchorMenu>
              </Link>
            </li>
          </ListMenu>
        </nav>
        <LabelSearch htmlFor="search">
          <InputSearch type="search" placeholder="검색어를 입력해주세요." />
          <BtnSearch type="button">
            <IconSearch />
          </BtnSearch>
        </LabelSearch>
        <ListBtns>
          <ItemBtns>
            <Link href={ROUTES.cart} passHref>
              <a>
                <IconCart />
                <span className="sr-only">장바구니</span>
              </a>
            </Link>
          </ItemBtns>
          <ItemBtns>
            <BtnDarkMode type="button" onClick={() => isDark(!isDark())}>
              {useReactiveVar(isDark) ? <DarkIcon /> : <LightIcon />}
            </BtnDarkMode>
          </ItemBtns>
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

const AnchorLogo = styled.a`
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

const AnchorUserMenu = styled.a`
  color: ${({ theme }) => theme.text.default};
`;

const ListMenu = styled.ul`
  display: flex;
  font-size: ${pxToRem(18)};
  font-weight: 600;

  & li.recentEvent {
    @media screen and (max-width: ${pxToRem(860)}) {
      display: none;
    }
  }
`;

const AnchorMenu = styled.a`
  display: block;
  box-sizing: border-box;
  padding: ${pxToRem(15)} ${pxToRem(10)} ${pxToRem(12)};
  border-bottom: ${pxToRem(3)} solid transparent;
  color: ${({ theme }) => theme.text.default};
  transition: border-color 0.3s;

  &:hover,
  &:active {
    border-color: ${({ theme }) => theme.text.default};
  }
`;

const ListBtns = styled.ul`
  display: flex;
`;

const ItemBtns = styled.li`
  width: ${pxToRem(20)};
`;

const IconCart = styled(Cart)`
  fill: ${({ theme }) => theme.text.default};
`;

const LabelSearch = styled.label`
  display: flex;
  align-items: center;
  margin: 0 ${pxToRem(15)} 0 ${pxToRem(30)};
  padding: 0 ${pxToRem(15)};
  border-radius: ${pxToRem(30)};
  background-color: ${({ theme }) => theme.input.background};
`;

const InputSearch = styled.input`
  padding: ${pxToRem(10)} 0;
  border: 0;
  background: none;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const BtnSearch = styled.button`
  width: ${pxToRem(18)};
`;

const IconSearch = styled(Search)`
  fill: ${GRAY_900};
`;

const BtnDarkMode = styled.button`
  width: ${pxToRem(20)};
  margin-left: ${pxToRem(15)};
`;
