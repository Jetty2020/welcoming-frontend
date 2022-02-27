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

  const [loginMutation, { loading }] = useMutation<
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
        <form>
          <label htmlFor="emailDomain">
            이메일
            <input type="text" placeholder="이메일" />
          </label>
          <span>필수 입력 항목입니다.</span>
          <span>이메일 형식이 올바르지 않습니다.</span>
          <span>이미 가입한 이메일입니다.</span>
          <label htmlFor="password">
            비밀번호
            <span>
              비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로
              입력해주세요.
            </span>
            <input type="password" placeholder="비밀번호" />
          </label>
          <span>
            비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리이어야
            합니다.
          </span>
          <label htmlFor="passwordCheck">
            비밀번호 확인
            <input type="password" placeholder="비밀번호 확인" />
          </label>
          <span>비밀번호가 일치하지 않습니다.</span>
          <label htmlFor="nickName">
            별명
            <span>다른 유저와 겹치지 않는 닉네임을 입력해주세요.(2~15자)</span>
            <input type="text" placeholder="닉네임 (2~15자)" />
          </label>
          <span>사용 중인 별명입니다.</span>
          <span>별명은 2~15자리이어야 합니다.</span>
          <div>
            약관동의
            <div>
              <label htmlFor="agreeAll">
                <input type="checkbox" id="agreeAll" />
                전체동의
              </label>
              <label htmlFor="agreeAll">
                <input type="checkbox" id="agreeAll" />만 14세 이상이니다.
                <span>&#40;필수&#41;</span>
              </label>
              <label htmlFor="agreeAll">
                <input type="checkbox" id="agreeAll" />
                이용약관
                <span>&#40;필수&#41;</span>
              </label>
              <label htmlFor="agreeAll">
                <input type="checkbox" id="agreeAll" />
                개인정보수집 및 이용동의
                <span>&#40;필수&#41;</span>
              </label>
            </div>
          </div>
          <button type="submit">회원가입하기</button>
        </form>
        <p>
          이미 아이디가 있으신가요?
          <Link href="login">
            <a>로그인</a>
          </Link>
        </p>
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
  width: 100%;
  max-width: ${pxToRem(300)};
  padding: ${pxToRem(30)};
  margin: ${pxToRem(50)} 0;
  flex-grow: 1;
`;

const Contlogo = styled.div`
  width: ${pxToRem(200)};
  margin: 0 auto ${pxToRem(50)};
`;

const InputSyle = styled.input`
  width: 100%;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: ${({ theme }) => theme.input.border};
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
  &[data-login-error='true'] {
    border-color: ${({ theme }) => theme.input.error};
  }
`;

const InputEmail = styled(InputSyle)`
  border-radius: ${pxToRem(5)} ${pxToRem(5)} 0 0;
`;
