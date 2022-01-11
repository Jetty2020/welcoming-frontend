import { gql, useMutation } from '@apollo/client';
import { NextPage } from 'next';
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

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginInput>({
    mode: 'onChange',
  });
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
  return (
    <div>
      <PageTitle title="로그인" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('email', {
            required: '메일 작성칸이 비어있습니다.',
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          })}
          name="email"
          type="text"
          placeholder="Email"
          className="input"
        />
        {/* {errors && <div>{errors}</div>} */}
        <input
          {...register('password', {
            required: '비밀번호 작성칸이 비어있습니다.',
          })}
          name="password"
          type="password"
          placeholder="Password"
          className="input"
        />
        <button type="submit">Log in </button>
      </form>
    </div>
  );
};

export default Login;
