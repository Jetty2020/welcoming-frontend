import { gql, useMutation } from '@apollo/client';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import PageTitle from '../../components/common/PageTitle';
import { LoginInput } from '../../__generated__/globalTypes';
import {
  loginMutation,
  loginMutationVariables,
} from '../../__generated__/loginMutation';

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
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });

  const regExpEm =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    console.log(data);
    if (ok && token) {
      // localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      // authTokenVar(token);
      // isLoggedInVar(true);
      router.push('/');
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  // const onSubmit = () => {
  //   if (!loading) {
  //     const { email, password } = getValues();
  //     loginMutation({
  //       variables: {
  //         loginInput: {
  //           email,
  //           password,
  //         },
  //       },
  //     });
  //   }
  // };
  return (
    <>
      <PageTitle title="로그인" />
      <Header>
        <button type="button">
          <span className="sr-only">뒤로가기</span>
        </button>
        <span>로그인</span>
      </Header>
      <SectionLogin>
        <h2 className="sr-only">로그인</h2>
        <Contlogo>
          <img src={theme.logo} alt="어서와 우리집 로고" />
        </Contlogo>
        <FormLogin>
          <Label htmlFor="email">
            <Input
              id="email"
              type="text"
              placeholder="이메일"
              {...register('email', {
                required: true,
                pattern: regExpEm,
              })}
            />
          </Label>
          <Label htmlFor="password">
            <Input
              type="password"
              placeholder="비밀번호"
              {...register('password', {
                required: true,
              })}
            />
          </Label>
          <Error>이메일 또는 비밀번호가 일치하지 않습니다.</Error>
          <BtnLogin type="submit">로그인</BtnLogin>
        </FormLogin>
        <ListLink>
          <li>
            <Link href="/">
              <a>비밀번호 재설정</a>
            </Link>
          </li>
          <li>
            <Link href="/">
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
  border: 1px solid #dbdbdb;

  &:first-of-type {
    border-radius: 5px 5px 0 0;
  }
  &:last-of-type {
    margin-top: -1px;
    border-radius: 0 0 5px 5px;
  }

  &.error {
    border-color: #ff003e;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 0;
  box-sizing: border-box;
  font-size: 16px;

  &::placeholder {
    color: #dbdbdb;
  }
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
    background: url('/emoji-frown.svg') no-repeat;
    background-size: 100%;
  }
`;
const BtnLogin = styled.button`
  margin: 20px 0;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.bg.primary};
  font-size: 16px;
`;
const ListLink = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;

  & li {
    margin: 0 10px;
  }
`;
