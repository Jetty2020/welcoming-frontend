import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChevronLeft } from 'public/icons';
import { pxToRem } from '@utils/pxToRem';
import Link from 'next/link';

const PasswordReset: NextPage = () => {
  const router = useRouter();

  return (
    <MainPasswordReset>
      <Header>
        <BtnClose type="button" onClick={() => router.push('/')}>
          <ChevronLeft />
          <span className="sr-only">뒤로가기</span>
        </BtnClose>
        <span>비밀번호 재설정</span>
      </Header>
      <SectionPasswordReset>
        <h2 className="sr-only">비밀번호 재설정</h2>
        <Form>
          <TextPasswordReset>
            가입한 이메일 주소를 입력해주세요.
          </TextPasswordReset>
          <Label htmlFor="email">
            <Input type="email" id="email" placeholder="이메일" />
          </Label>
          <Error>등록된 이메일 주소가 아닙니다.</Error>
          <BtnEmail type="submit">이메일로 인증코드 받기</BtnEmail>
        </Form>
        <Form>
          <Label htmlFor="verification">
            <Input
              type="text"
              id="verification"
              placeholder="인증코드 6자리 입력"
            />
            <Timer>00:00</Timer>
          </Label>
          <Error>올바른 인증코드가 아닙니다.</Error>
          <Error>인증코드가 만료되었습니다.</Error>
          <TextResend>
            인증코드를 받지 못하셨나요?
            <BtnResend type="button">인증코드 재전송하기</BtnResend>
          </TextResend>
          <BtnEmail type="submit">인증번호 확인</BtnEmail>
        </Form>
      </SectionPasswordReset>
      <FooterPasswordReset>
        <Link href="/" passHref>
          <a>© &nbsp;welcoming, Co., Ltd.</a>
        </Link>
        . All Rights Reserved
      </FooterPasswordReset>
    </MainPasswordReset>
  );
};

export default PasswordReset;

const MainPasswordReset = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: ${pxToRem(50)};
  background-color: ${({ theme }) => theme.bg.bodyBg};
  color: ${({ theme }) => theme.text.bodyText};
`;

const BtnClose = styled.button`
  position: absolute;
  top: 50%;
  left: ${pxToRem(15)};
  transform: translateY(-50%);
  font-size: 0;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
    fill: #000;
  }
`;

const SectionPasswordReset = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${pxToRem(30)};
  margin-top: ${pxToRem(50)};
  box-sizing: border-box;
  flex: 1;
`;

const TextPasswordReset = styled.p`
  margin-bottom: ${pxToRem(12)};
  color: ${({ theme }) => theme.text.bodyText};
  font-size: ${pxToRem(14)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  overflow: hidden;
  position: relative;
  border: 1px solid #dbdbdb;
  border-radius: ${pxToRem(5)};
`;

const Input = styled.input`
  width: 100%;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: 0;
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: #dbdbdb;
  }
  /* &[data-login-error='true'] {
    border-color: #ff003e;
  } */
`;

const Error = styled.span`
  display: flex;
  align-items: center;
  margin-top: ${pxToRem(10)};
  color: #ff003e;
  font-size: ${pxToRem(14)};

  &::before {
    content: '';
    display: inline-block;
    width: ${pxToRem(14)};
    height: ${pxToRem(14)};
    margin: ${pxToRem(-2)} ${pxToRem(5)} 0 0;
    background: url('/icons/emoji-frown.svg') no-repeat;
    background-size: 100%;
  }
`;

const Timer = styled.span`
  position: absolute;
  top: 50%;
  right: ${pxToRem(15)};
  transform: translateY(-50%);
  color: #ff003e;
  font-size: ${pxToRem(14)};
`;

const BtnEmail = styled.button`
  margin: ${pxToRem(20)} 0;
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.bg.primary};
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.bg.darkBtn};
  }
`;

const TextResend = styled.div`
  margin-top: ${pxToRem(10)};
  color: #828c94;
  font-size: ${pxToRem(13)};
`;

const BtnResend = styled.button`
  margin-left: ${pxToRem(5)};
  font-size: ${pxToRem(13)};
  text-decoration: underline;
`;

const FooterPasswordReset = styled.footer`
  padding: ${pxToRem(30)} 0;
  font-size: ${pxToRem(14)};
`;
