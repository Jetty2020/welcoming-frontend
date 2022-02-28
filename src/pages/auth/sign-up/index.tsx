import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AuthFooter } from '@components/auth/Footer';
import PageTitle from '@components/common/PageTitle';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '@generated/createAccountMutation';
import { pxToRem } from '@utils/pxToRem';
import { Close } from 'public/icons';
import { GRAY_500, PRIMARY_900, WHITE } from '@constants/colors';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

const SignUp: NextPage = () => {
  const router = useRouter();

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      router.push('/');
    }
  };

  const [createAccountMutation, { loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  return (
    <MainSignUp>
      <PageTitle title="회원가입" />
      <Header>
        <BtnClose type="button" onClick={() => router.push('/')}>
          <Close />
          <span className="sr-only">뒤로가기</span>
        </BtnClose>
        <span>회원가입</span>
      </Header>
      <SectionSignUp>
        <h2 className="sr-only">회원가입</h2>
        <Contlogo>
          <img src="/logo/logo.png" alt="어서와 우리집 로고" />
        </Contlogo>
        <Form>
          <Label htmlFor="emailDomain">
            이메일
            <Input type="text" placeholder="이메일" />
          </Label>
          <Error>필수 입력 항목입니다.</Error>
          <Error>이메일 형식이 올바르지 않습니다.</Error>
          <Error>이미 가입한 이메일입니다.</Error>
          <Label htmlFor="password">
            비밀번호
            <Desc>영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.</Desc>
            <Input type="password" placeholder="비밀번호" />
          </Label>
          <Error>
            비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리이어야
            합니다.
          </Error>
          <Label htmlFor="passwordCheck">
            비밀번호 확인
            <Input type="password" placeholder="비밀번호 확인" />
          </Label>
          <Error>비밀번호가 일치하지 않습니다.</Error>
          <Label htmlFor="nickName">
            별명
            <Desc>다른 유저와 겹치지 않는 별명을 입력해주세요. (2~15자)</Desc>
            <Input type="text" placeholder="닉네임 (2~15자)" />
          </Label>
          <Error>사용 중인 별명입니다.</Error>
          <Error>별명은 2~15자리이어야 합니다.</Error>
          <ContainerAgreement>
            약관동의
            <InnerContainerAgreement>
              <LabelAgreement htmlFor="agreeAll">
                <CheckBox type="checkbox" id="agreeAll" />
                전체동의
              </LabelAgreement>
              <LabelAgreement htmlFor="agreeAge">
                <CheckBox type="checkbox" id="agreeAge" />만 14세 이상입니다.
                <SpanRequire>&#40;필수&#41;</SpanRequire>
              </LabelAgreement>
              <LabelAgreement htmlFor="agreeTerm">
                <CheckBox type="checkbox" id="agreeTerm" />
                <Link href="/" passHref>
                  <LinkAgreeMent target="_blank">이용약관</LinkAgreeMent>
                </Link>
                <SpanRequire>&#40;필수&#41;</SpanRequire>
              </LabelAgreement>
              <LabelAgreement htmlFor="agreePrivacy">
                <CheckBox type="checkbox" id="agreePrivacy" />
                <Link href="/" passHref>
                  <LinkAgreeMent target="_blank">
                    개인정보수집 및 이용동의
                  </LinkAgreeMent>
                </Link>
                <SpanRequire>&#40;필수&#41;</SpanRequire>
              </LabelAgreement>
            </InnerContainerAgreement>
          </ContainerAgreement>
          <Button type="submit">회원가입하기</Button>
        </Form>
        <TextAskID>
          이미 아이디가 있으신가요?
          <Link href="/auth/sign-in" passHref>
            <AskIDLink>로그인</AskIDLink>
          </Link>
        </TextAskID>
      </SectionSignUp>
      <AuthFooter />
    </MainSignUp>
  );
};

export default SignUp;

const MainSignUp = styled.main`
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
  background-color: ${({ theme }) => theme.header.background};
  color: ${({ theme }) => theme.text.default};
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
  }
`;

const SectionSignUp = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  max-width: ${pxToRem(450)};
  padding: ${pxToRem(30)};
  margin: ${pxToRem(50)} 0;
  flex-grow: 1;
`;

const Contlogo = styled.div`
  width: ${pxToRem(200)};
  margin: 0 auto ${pxToRem(50)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 700;
`;

const Desc = styled.span`
  margin-top: 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.4;
  color: ${GRAY_500};
`;

const Input = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: ${({ theme }) => theme.input.border};
  border-radius: ${pxToRem(5)};
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
  &[data-login-error='true'] {
    border-color: ${({ theme }) => theme.input.error};
  }
`;

const Error = styled.span`
  /* display: none; */
  margin-top: ${pxToRem(10)};
  color: ${({ theme }) => theme.input.error};
  font-size: ${pxToRem(14)};
  line-height: 1.4;

  &::before {
    content: '';
    display: inline-block;
    min-width: ${pxToRem(14)};
    height: ${pxToRem(14)};
    margin: 0 ${pxToRem(5)} ${pxToRem(-2)} 0;
    background: url('/icons/emoji-frown.svg') no-repeat;
    background-size: 100%;
  }
`;

const ContainerAgreement = styled.div`
  font-size: 15px;
  font-weight: 700;
`;

const InnerContainerAgreement = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  padding: 20px 10px 10px;
  border: ${({ theme }) => theme.input.border};
  background-color: ${WHITE};
`;

const LabelAgreement = styled.label`
  display: flex;
  align-items: center;
  margin: 6px 0;
  font-weight: 500;

  &[for='agreeAll'] {
    margin-top: 0;
    padding-bottom: 20px;
    border-bottom: ${({ theme }) => theme.input.border};
    font-weight: 700;
  }
`;

const LinkAgreeMent = styled.a`
  text-decoration: underline;
`;

const SpanRequire = styled.span`
  margin-left: 5px;
  color: ${PRIMARY_900};
`;

const CheckBox = styled.input`
  display: grid;
  place-content: center;
  appearance: none;
  background-color: #fff;
  width: 18px;
  height: 18px;
  margin-right: 10px;
  border: 1px solid ${GRAY_500};
  border-radius: 2px;

  &:checked {
    border: none;
    background-color: ${({ theme }) => theme.background.primary};
  }
  &:checked::before {
    content: '';
    width: 14px;
    height: 14px;
    border-radius: 1px;
    box-shadow: inset 14px 14px ${WHITE};
    clip-path: polygon(15% 41%, 44% 65%, 83% 10%, 95% 20%, 47% 88%, 5% 54%);
  }
`;

const Button = styled.button`
  width: 100%;
  margin: ${pxToRem(35)} 0 ${pxToRem(30)};
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.button.background};
  font-size: ${({ theme }) => pxToRem(theme.button.fontSize)};
  font-weight: ${({ theme }) => theme.button.fontWeight};
  letter-spacing: ${({ theme }) => theme.button.letterSpacing};
  color: ${({ theme }) => theme.button.text};

  &:disabled {
    background-color: ${({ theme }) => theme.button.disabled};
  }
`;

const TextAskID = styled.p`
  text-align: center;
`;

const AskIDLink = styled.a`
  margin-left: 5px;
  font-weight: 600;
  text-decoration: underline;
`;
