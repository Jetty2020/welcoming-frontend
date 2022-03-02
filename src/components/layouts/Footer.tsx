import styled from '@emotion/styled';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';
import { ChevronRight } from 'public/icons';

export const Footer = () => {
  return (
    <LayoutFooter>
      <section>
        <TitleCs>
          고객센터
          <ChevronRight />
        </TitleCs>
        <CsTel>1234-1234</CsTel>
        <CsTime>평일 09:00 ~ 18:00 (주말, 공휴일 제외)</CsTime>
      </section>
      <section>
        <h2 className="sr-only">기업정보</h2>
        <nav>
          <FooterNav>
            <li>
              <Link href="/" passHref>
                <a>이용악관</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>개인정보처리방침</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>공지사항</a>
              </Link>
            </li>
            <li>
              <Link href="/" passHref>
                <a>고객센터</a>
              </Link>
            </li>
          </FooterNav>
          <dl>
            <CompanyInfoBox>
              <dt>상호명 :</dt>
              <dd>(주)어서와우리집</dd>
            </CompanyInfoBox>
            <CompanyInfoBox>
              <dt>대표이사 :</dt>
              <dd>박정훈, 이보리</dd>
            </CompanyInfoBox>
            <CompanyInfoBox>
              <dt>사업자등록번호 :</dt>
              <dd>000-00-00000</dd>
            </CompanyInfoBox>
            <CompanyInfoBox>
              <dt>통신판매업신고 :</dt>
              <dd>2022-가나다라-0000호</dd>
            </CompanyInfoBox>
          </dl>
        </nav>
        <FooterRow>
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
        </FooterRow>
      </section>
    </LayoutFooter>
  );
};

const LayoutFooter = styled.footer`
  margin-bottom: ${pxToRem(64)};
  padding: ${pxToRem(30)} ${pxToRem(15)} 0;
  font-size: ${pxToRem(14)};
`;

const TitleCs = styled.h2`
  font-weight: 700;

  & svg {
    width: ${pxToRem(14)};
    margin-left: ${pxToRem(5)};
    vertical-align: top;
  }
`;

const CsTel = styled.span`
  display: inline-block;
  margin: ${pxToRem(8)} 0;
  font-size: ${pxToRem(30)};
  font-weight: 700;
`;

const CsTime = styled.p`
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(12)};
`;

const FooterNav = styled.ul`
  display: flex;
  margin: ${pxToRem(20)} 0;
  color: ${({ theme }) => theme.text.lighter};

  & li + li {
    margin-left: ${pxToRem(8)};
  }
`;

const CompanyInfoBox = styled.div`
  display: flex;

  & + & {
    margin-top: ${pxToRem(10)};
  }

  & dt {
    margin-right: ${pxToRem(8)};
  }
`;

const FooterRow = styled.div`
  margin: ${pxToRem(30)} ${pxToRem(-15)} 0;
  padding: ${pxToRem(30)} 0;
  background-color: ${({ theme }) => theme.header.background};
  color: ${({ theme }) => theme.text.lighter};
  font-size: ${pxToRem(12)};
  text-align: center;
`;

const Message = styled.p`
  margin-top: ${pxToRem(10)};
`;
