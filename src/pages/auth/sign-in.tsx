import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Close from 'public/icons/close.svg';
import { pxToRem } from 'src/utils/pxToRem';
import PageTitle from '@components/common/PageTitle';
import { authTokenVar, isLoggedInVar } from '@apollo';
import { LoginInput } from '@generated/globalTypes';
import {
  loginMutation,
  loginMutationVariables,
} from '@generated/loginMutation';
import { AuthFooter } from '@components/auth/Footer';
import { ROUTES } from '@constants/routes';

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
  const theme = useTheme();
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
        <BtnClose type="button" onClick={() => router.back()}>
          <IconClose />
          <span className="sr-only">뒤로가기</span>
        </BtnClose>
        <span>로그인</span>
      </Header>
      <SectionLogin>
        <h2 className="sr-only">로그인</h2>
        <ContainerLogo>
          <img src={theme.logo.src} alt="어서와 우리집 로고" />
        </ContainerLogo>
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
            <TextError>이메일 또는 비밀번호가 일치하지 않습니다.</TextError>
          )}
          <BtnLogin type="submit" disabled={!isValid}>
            로그인
          </BtnLogin>
        </FormLogin>
        <ListLink>
          <ItemLink>
            <Link href={ROUTES.passwordReset} passHref>
              <a>비밀번호 재설정</a>
            </Link>
          </ItemLink>
          <ItemLink>
            <Link href={ROUTES.signUp} passHref>
              <a>회원가입</a>
            </Link>
          </ItemLink>
        </ListLink>
      </SectionLogin>
      <AuthFooter />
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
  background-color: ${({ theme }) => theme.header.background};
  color: ${({ theme }) => theme.text.default};
`;

const BtnClose = styled.button`
  position: absolute;
  top: 50%;
  left: ${pxToRem(15)};
  transform: translateY(-50%);
  font-size: 0;
`;

const IconClose = styled(Close)`
  width: ${pxToRem(20)};
  height: ${pxToRem(20)};
`;

const SectionLogin = styled.section`
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

const ContainerLogo = styled.div`
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

const InputPassword = styled(InputSyle)`
  margin-top: -1px;
  border-radius: 0 0 ${pxToRem(5)} ${pxToRem(5)};
`;

const TextError = styled.span`
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

const BtnLogin = styled.button`
  margin: ${pxToRem(20)} 0;
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

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemLink = styled.li`
  margin: 0 ${pxToRem(10)};
`;
