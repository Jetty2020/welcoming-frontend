import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Cookies from 'js-cookie';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authTokenVar, isLoggedInVar } from '../../apollo';
import PageTitle from '../../components/common/PageTitle';
import { LoginInput } from '../../__generated__/globalTypes';
import {
  loginMutation,
  loginMutationVariables,
} from '../../__generated__/loginMutation';
import { Close } from '../../../public/icons';
import { pxToRem } from '../utils/pxToRem';

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

const Login: NextPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      Cookies.set('TOKEN', token);
      authTokenVar(token);
      isLoggedInVar(true);
      router.push('/');
    } else {
      setLoginError(true);
    }
  };

  const [loginMutation, { loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  const handleChange = () => {
    setLoginError(false);
  };

  return (
    <MainLogin>
      <PageTitle title="로그인" />
      <Header>
        <BtnClose type="button" onClick={() => router.push('/')}>
          <Close />
          <span className="sr-only">뒤로가기</span>
        </BtnClose>
        <span>로그인</span>
      </Header>
      <SectionLogin>
        <h2 className="sr-only">로그인</h2>
        <Contlogo>
          <img src="/logo/logo_txt.png" alt="어서와 우리집 로고" />
        </Contlogo>
        <FormLogin onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">
            <InputEmail
              id="email"
              type="text"
              placeholder="이메일"
              {...register('email', {
                required: true,
                onChange: handleChange,
              })}
              data-login-error={loginError}
            />
          </Label>
          <Label htmlFor="password">
            <InputPassword
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: true,
                onChange: handleChange,
              })}
              data-login-error={loginError}
            />
          </Label>
          {loginError && (
            <Error>이메일 또는 비밀번호가 일치하지 않습니다.</Error>
          )}
          <BtnLogin type="submit" disabled={!isValid}>
            로그인
          </BtnLogin>
        </FormLogin>
        <ListLink>
          <li>
            <Link href="/" passHref>
              <a>비밀번호 재설정</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>회원가입</a>
            </Link>
          </li>
        </ListLink>
      </SectionLogin>
      <FooterLogin>
        <Link href="/" passHref>
          <a>© &nbsp;welcoming, Co., Ltd.</a>
        </Link>
        . All Rights Reserved
      </FooterLogin>
    </MainLogin>
  );
};

export default Login;

const MainLogin = styled.main`
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
  }
`;

const SectionLogin = styled.section`
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

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  overflow: hidden;
`;

const InputSyle = styled.input`
  width: 100%;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: #dbdbdb;
  }
  &[data-login-error='true'] {
    border-color: #ff003e;
  }
`;

const InputEmail = styled(InputSyle)`
  border-radius: ${pxToRem(5)} ${pxToRem(5)} 0 0;
`;

const InputPassword = styled(InputSyle)`
  margin-top: -1px;
  border-radius: 0 0 ${pxToRem(5)} ${pxToRem(5)};
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

const BtnLogin = styled.button`
  margin: ${pxToRem(20)} 0;
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.bg.primary};
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.bg.darkBtn};
  }
`;

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  & li {
    margin: 0 ${pxToRem(10)};
  }
`;

const FooterLogin = styled.footer`
  padding: ${pxToRem(30)} 0;
  font-size: ${pxToRem(14)};
`;
