import { gql, useMutation } from '@apollo/client';
import { useTheme } from '@emotion/react';
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
  const theme = useTheme();
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

  const [loginError, setLoginError] = useState(false);
  const handleChange = () => {
    setLoginError(false);
  };

  return (
    <>
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
          <img src={theme.logo} alt="어서와 우리집 로고" />
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
              data-loginError={loginError}
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
              data-loginError={loginError}
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
    </>
  );
};

export default Login;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 50px;
  background-color: ${({ theme }) => theme.bg.bodyBg};
  color: ${({ theme }) => theme.text.bodyText};
`;

const BtnClose = styled.button`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  font-size: 0;

  & svg {
    width: 20px;
    height: 20px;
  }
`;

const SectionLogin = styled.section`
  min-height: 100vh;
  margin-top: 50px;
  padding: 30px;
`;

const Contlogo = styled.div`
  width: 200px;
  margin: 50px auto;
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
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #dbdbdb;
  font-size: 16px;

  &::placeholder {
    color: #dbdbdb;
  }
  &[data-loginError='true'] {
    border-color: #ff003e;
  }
`;

const InputEmail = styled(InputSyle)`
  border-radius: 5px 5px 0 0;
`;

const InputPassword = styled(InputSyle)`
  margin-top: -1px;
  border-radius: 0 0 5px 5px;
`;

const Error = styled.span`
  display: flex;
  align-items: center;
  margin-top: 10px;
  color: #ff003e;
  font-size: 14px;

  &::before {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: -2px 5px 0 0;
    background: url('/icons/emoji-frown.svg') no-repeat;
    background-size: 100%;
  }
`;

const BtnLogin = styled.button`
  margin: 20px 0;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg.primary};
  font-size: 16px;

  &:disabled {
    background-color: ${({ theme }) => theme.bg.darkBtn};
  }
`;

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  & li {
    margin: 0 10px;
  }
`;
