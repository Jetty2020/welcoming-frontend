import { gql, useReactiveVar } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { isLoggedInVar } from '../../apollo';
import PageTitle from '../../component/common/PageTitle';

const Login: NextPage = () => {
  const LOGIN_MUTATION = gql`
    mutation loginMutation($email: String!, $password: String!) {
      login(input: { email: $email, password: $password }) {
        ok
        token
        error
      }
    }
  `;

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    console.log(email, password, errors);
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
