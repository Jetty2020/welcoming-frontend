import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';
import ChevronRight from 'public/icons/chevron-right.svg';

export const Footer = () => {
  return (
    <LayoutFooter>
      <ContainerSection>
        <Section>
          <TitleCS>
            고객센터
            <IconChevronRight />
          </TitleCS>
          <TelCS>1234-1234</TelCS>
          <TimeCS>
            평일 09:00 ~ 18:00 (점심시간 12:00 ~ 14:00 제외 / 주말, 공휴일 제외)
          </TimeCS>
          <ListBtnCS>
            <ItemBtnCS>
              <BtnCS type="button">자주하는 질문</BtnCS>
            </ItemBtnCS>
            <ItemBtnCS>
              <BtnCS type="button">1:1 문의</BtnCS>
            </ItemBtnCS>
          </ListBtnCS>
        </Section>
        <Section>
          <h2 className="sr-only">기업정보</h2>
          <nav>
            <MenuFooter>
              <ItemMenu>
                <Link href="/" passHref>
                  <a>이용악관</a>
                </Link>
              </ItemMenu>
              <ItemMenu>
                <Link href="/" passHref>
                  <a>개인정보처리방침</a>
                </Link>
              </ItemMenu>
              <ItemMenu>
                <Link href="/" passHref>
                  <a>공지사항</a>
                </Link>
              </ItemMenu>
              <ItemMenu>
                <Link href="/" passHref>
                  <a>고객센터</a>
                </Link>
              </ItemMenu>
            </MenuFooter>
            <dl>
              <InfoCompany>
                <TitleInfo>상호명 :</TitleInfo>
                <dd>(주)어서와우리집</dd>
              </InfoCompany>
              <InfoCompany>
                <TitleInfo>주소 :</TitleInfo>
                <dd>광주광역시 웰컴구 웰컴로 000 </dd>
              </InfoCompany>
              <InfoCompany>
                <TitleInfo>대표이사 :</TitleInfo>
                <dd>박정훈, 이보리</dd>
              </InfoCompany>
              <InfoCompany>
                <TitleInfo>사업자등록번호 :</TitleInfo>
                <dd>000-00-00000</dd>
              </InfoCompany>
              <InfoCompany>
                <TitleInfo>통신판매업신고 :</TitleInfo>
                <dd>2022-가나다라-0000호</dd>
              </InfoCompany>
              <InfoCompany>
                <TitleInfo>이메일 :</TitleInfo>
                <dd>welcoming@이메일.com</dd>
              </InfoCompany>
            </dl>
          </nav>
        </Section>
      </ContainerSection>
      <ContainerMessage>
        <small>
          <Link href="/" passHref>
            <a>© &nbsp;welcoming, Co., Ltd.</a>
          </Link>
          . All Rights Reserved
        </small>
        <Message>
          * 해당 웹페이지는 실제 운영 중인 사이트가 아닌 포트폴리오 사이트
          입니다.
        </Message>
      </ContainerMessage>
    </LayoutFooter>
  );
};

const LayoutFooter = styled.footer`
  margin: 0 auto ${pxToRem(64)};
  padding: ${pxToRem(30)} ${pxToRem(15)} 0;
  font-size: ${pxToRem(14)};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    margin-bottom: 0;
    padding: 0;
  }
`;

const ContainerSection = styled.div`
  max-width: ${pxToRem(1200)};
  margin: 0 auto;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 0;
    padding: ${pxToRem(30)} ${pxToRem(30)} 0;
  }
`;

const Section = styled.section`
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    width: calc(50% - ${pxToRem(30)});

    & + & {
      padding-left: ${pxToRem(60)};
    }
  }
`;

const TitleCS = styled.h2`
  font-weight: 700;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    font-size: ${pxToRem(20)};
  }
`;

const IconChevronRight = styled(ChevronRight)`
  width: ${pxToRem(14)};
  margin-left: ${pxToRem(5)};
  vertical-align: top;
  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const TelCS = styled.span`
  display: inline-block;
  margin: ${pxToRem(8)} 0;
  font-size: ${pxToRem(30)};
  font-weight: 700;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    font-size: ${pxToRem(40)};
  }
`;

const TimeCS = styled.p`
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(13)};
  font-weight: 600;
  line-height: 1.3;

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    font-size: ${pxToRem(16)};
  }
`;

const ListBtnCS = styled.ul`
  width: 100%;
  margin-top: ${pxToRem(10)};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
  }
`;

const ItemBtnCS = styled.li`
  display: inline-block;
  width: calc(50% - ${pxToRem(5)});

  & + & {
    margin-left: ${pxToRem(10)};
  }
`;

const BtnCS = styled.button`
  width: 100%;
  padding: ${pxToRem(10)} 0;
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.text.default};
  font-size: ${pxToRem(16)};
  color: ${({ theme }) => theme.background.default};
  letter-spacing: 1px;
`;

const MenuFooter = styled.ul`
  display: flex;
  margin: ${pxToRem(20)} 0;
  color: ${({ theme }) => theme.text.lighter};

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    margin: 0 0 ${pxToRem(20)};
    font-size: ${pxToRem(17)};
  }
`;

const ItemMenu = styled.li`
  & + & {
    margin-left: ${pxToRem(8)};
  }

  @media screen and (min-width: ${({ theme }) => theme.mediaQuery.tablet}) {
    & + & {
      margin-left: ${pxToRem(15)};
    }
  }
`;

const InfoCompany = styled.div`
  display: flex;

  & + & {
    margin-top: ${pxToRem(10)};
  }
`;

const TitleInfo = styled.dt`
  margin-right: ${pxToRem(8)};
`;

const ContainerMessage = styled.div`
  margin: ${pxToRem(30)} auto 0;
  padding: ${pxToRem(30)} 0;
  background-color: ${({ theme }) => theme.header.background};
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(12)};
  text-align: center;
`;

const Message = styled.p`
  margin-top: ${pxToRem(10)};
`;
