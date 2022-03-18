import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { useReactiveVar } from '@apollo/client';
import Link from 'next/link';
import { isDark, isLoggedInVar, userLogout } from '@apollo';
import Cart from 'public/icons/cart.svg';
import DarkIcon from 'public/icons/dark-icon.svg';
import LightIcon from 'public/icons/light-icon.svg';
import Search from 'public/icons/search.svg';
import Caret from 'public/icons/caret-down.svg';
import { EmotionProps } from 'src/types';
import { useScrollY } from '@hooks/useScrollY';
import { GRAY_900 } from '@constants/colors';
import { pxToRem } from '@utils/pxToRem';
import { ROUTES } from '@constants/routes';
import { useUser } from '@hooks/useUser';

export const DesktopNav = ({ className }: EmotionProps) => {
  const theme = useTheme();
  const { isScroll, isUpward } = useScrollY();

  const cartRoute = isLoggedInVar() ? ROUTES.cart : ROUTES.signIn;

  const { data, loading } = useUser();

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
          {useReactiveVar(isLoggedInVar) ? (
            <ItemUserMenu className="showMyPageMenu">
              <Link href={ROUTES.myPage} passHref>
                <AnchorUserMenu>
                  {loading ? '유저' : data?.me.nickname} 님
                  <IconCaret />
                </AnchorUserMenu>
              </Link>
              <ListMyPage>
                {data?.me.role === 'Seller' && (
                  <li>
                    <Link href="/" passHref>
                      <AnchorMyPage sellerPage={true}>상품 등록</AnchorMyPage>
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/" passHref>
                    <AnchorMyPage>주문내역</AnchorMyPage>
                  </Link>
                </li>
                <li>
                  <Link href="/" passHref>
                    <AnchorMyPage>위시리스트</AnchorMyPage>
                  </Link>
                </li>
                <li>
                  <Link href="/" passHref>
                    <AnchorMyPage>개인 정보 수정</AnchorMyPage>
                  </Link>
                </li>
                <li>
                  <BtnLogout type="button" onClick={userLogout}>
                    로그아웃
                  </BtnLogout>
                </li>
              </ListMyPage>
            </ItemUserMenu>
          ) : (
            <>
              <ItemUserMenu>
                <Link href={ROUTES.signIn} passHref>
                  <AnchorUserMenu>로그인</AnchorUserMenu>
                </Link>
              </ItemUserMenu>
              <ItemUserMenu>
                <Link href={ROUTES.signUp} passHref>
                  <AnchorUserMenu>회원가입</AnchorUserMenu>
                </Link>
              </ItemUserMenu>
            </>
          )}
          <ItemUserMenu>
            <Link href={ROUTES.csCenter} passHref>
              <AnchorUserMenu>고객센터</AnchorUserMenu>
            </Link>
          </ItemUserMenu>
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
            <span className="sr-only">검색하기</span>
          </BtnSearch>
        </LabelSearch>
        <ListBtns>
          <ItemBtns>
            <Link href={cartRoute} passHref>
              <AnchorCart>
                <IconCart />
                <span className="sr-only">장바구니로 이동하기</span>
              </AnchorCart>
            </Link>
          </ItemBtns>
          <ItemBtns>
            <BtnDarkMode type="button" onClick={() => isDark(!isDark())}>
              {isDark() ? (
                <>
                  <IconDarkMode />
                  <span className="sr-only">다크모드 전환하기</span>
                </>
              ) : (
                <>
                  <IconLightMode />
                  <span className="sr-only">라이트모드 전환하기</span>
                </>
              )}
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
  transition: all 0.5s;
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
  position: absolute;
  top: ${pxToRem(20)};
  right: ${pxToRem(15)};
  font-size: ${pxToRem(14)};
  font-weight: 600;
`;

const ItemUserMenu = styled.li`
  & + & {
    margin-left: ${pxToRem(15)};
  }

  &.showMyPageMenu:hover ul {
    visibility: visible;
    opacity: 1;
  }
`;

const AnchorUserMenu = styled.a`
  color: ${({ theme }) => theme.text.default};
`;

const IconCaret = styled(Caret)`
  display: inline-block;
  margin-left: ${pxToRem(5)};
  vertical-align: middle;
`;

const ListMyPage = styled.ul`
  visibility: hidden;
  position: absolute;
  top: ${pxToRem(20)};
  left: ${pxToRem(-5)};
  z-index: 10;
  padding: ${pxToRem(6)} 0;
  border: 1px solid ${({ theme }) => theme.text.default};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.background.default};
  opacity: 0;
  transition: all 0.3s;
`;

const AnchorMyPage = styled.a<{ sellerPage?: boolean }>`
  display: block;
  padding: ${pxToRem(5)} ${pxToRem(12)};
  font-size: ${pxToRem(12)};
  color: ${({ theme, sellerPage }) =>
    sellerPage ? theme.text.primary : theme.text.default};
`;

const BtnLogout = styled.button`
  display: block;
  padding: ${pxToRem(5)} ${pxToRem(12)};
  border: none;
  font-size: ${pxToRem(12)};
  font-weight: 600;
`;

const ListMenu = styled.ul`
  display: flex;
  font-size: ${pxToRem(18)};
  font-weight: 600;

  @media screen and (max-width: ${pxToRem(860)}) {
    & li.recentEvent {
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
  & + & {
    margin-left: ${pxToRem(2)};
  }
`;

const IconSize = () => css`
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
`;

const IconBorder = () => css`
  position: relative;
  padding: ${pxToRem(10)};
  border-radius: 50%;
  border: 1px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${useTheme().text.default};
  }
`;

const AnchorCart = styled.a`
  ${IconSize}
  ${IconBorder}
  display: block;
`;

const IconCart = styled(Cart)`
  ${IconSize}
  fill: ${({ theme }) => theme.text.default};
`;

const BtnDarkMode = styled.button`
  ${IconSize}
  ${IconBorder}
  box-sizing: content-box;
`;

const IconDarkMode = styled(DarkIcon)`
  ${IconSize}
  fill: ${({ theme }) => theme.text.default};
`;

const IconLightMode = styled(LightIcon)`
  ${IconSize}
  fill: ${({ theme }) => theme.text.default};
`;

const LabelSearch = styled.label`
  display: flex;
  align-items: center;
  position: relative;
  margin: 0 ${pxToRem(15)} 0 ${pxToRem(30)};
  padding: 0 ${pxToRem(15)};
  border-radius: ${pxToRem(30)};
  background-color: ${({ theme }) => theme.input.background};

  &:focus-within::after {
    content: '';
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: -2px;
    left: -2px;
    border: 2px solid ${({ theme }) => theme.text.primary};
    border-radius: ${pxToRem(34)};
  }
`;

const InputSearch = styled.input`
  padding: ${pxToRem(10)} 0;
  border: 0;
  background: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const BtnSearch = styled.button`
  width: ${pxToRem(18)};
  height: ${pxToRem(18)};
`;

const IconSearch = styled(Search)`
  fill: ${GRAY_900};
`;
