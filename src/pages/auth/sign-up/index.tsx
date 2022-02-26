import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AuthFooter } from '@components/common/auth/Footer';
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
          <img src="/logo/logo_txt.png" alt="어서와 우리집 로고" />
        </Contlogo>
        <form>
          <label htmlFor="emailDomain">
            <select id="emailDomain">
              <option disabled>선택하세요</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="hanmail.net">hanmail.net</option>
              <option value="hotmail.com">hotmail.com</option>
              <option value="gmail.com">gmail.com</option>
              <option value="nate.com">navnateer.com</option>
              <option value="icloud.com">icloud.com</option>
              <option value="outlook.com">outlook.com</option>
            </select>
          </label>
        </form>
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
  background-color: ${({ theme }) => theme.background.header};
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
