import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { pxToRem } from '@utils/pxToRem';
import {
  resetPasswordMutation,
  resetPasswordMutationVariables,
} from '@generated/resetPasswordMutation';

const RESET_PASSWORD = gql`
  mutation resetPasswordMutation($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(input: $resetPasswordInput) {
      ok
    }
  }
`;

interface PasswordFormProps {
  email: { current: string };
}

export const PasswordForm = ({ email }: PasswordFormProps) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const regExgPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<{
    password: string;
    passwordCheck: string;
  }>({
    mode: 'onChange',
  });

  const onCompleted = (data: resetPasswordMutation) => {
    const {
      resetPassword: { ok },
    } = data;
    if (ok) {
      router.push('/auth/login');
    } else {
      setErrorMsg('비밀번호 재설정에 실패했습니다.');
    }
  };

  const [resetPasswordMutation, { loading }] = useMutation<
    resetPasswordMutation,
    resetPasswordMutationVariables
  >(RESET_PASSWORD, {
    onCompleted,
  });

  const onSubmit = () => {
    const { password, passwordCheck } = getValues();
    if (loading) return;
    if (password === passwordCheck) {
      resetPasswordMutation({
        variables: {
          resetPasswordInput: {
            email: email.current,
            password,
          },
        },
      });
    } else {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextPasswordReset>비밀번호</TextPasswordReset>
      <Label
        htmlFor="password"
        data-form-error={Boolean(errors?.password) || Boolean(errorMsg)}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: true,
            pattern: regExgPw,
            onChange: () => setErrorMsg(''),
          })}
        />
      </Label>
      <TextPasswordReset>비밀번호 확인</TextPasswordReset>
      <Label htmlFor="passwordCheck" data-form-error={Boolean(errorMsg)}>
        <Input
          type="password"
          id="passwordCheck"
          {...register('passwordCheck', {
            required: true,
            onChange: () => setErrorMsg(''),
          })}
        />
      </Label>
      {errors?.password?.type === 'pattern' && (
        <Error>
          비밀번호는 영문(대/소문자 구분), 숫자 조합하여 6~12자리로
          입력해주세요.
        </Error>
      )}
      {errorMsg && <Error>{errorMsg}</Error>}
      <BtnPwReset type="submit" disabled={!isValid}>
        비밀번호 재설정
      </BtnPwReset>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextPasswordReset = styled.p`
  margin-bottom: ${pxToRem(12)};
  color: ${({ theme }) => theme.text.default};
  font-size: ${pxToRem(14)};
`;

const Label = styled.label`
  overflow: hidden;
  position: relative;
  border: ${({ theme }) => theme.input.border};
  border-radius: ${pxToRem(5)};

  & + p {
    margin-top: ${pxToRem(20)};
  }

  &[data-form-error='true'] {
    border-color: ${({ theme }) => theme.input.error};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: 0;
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
`;

const Error = styled.span`
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

const BtnPwReset = styled.button`
  margin: ${pxToRem(20)} 0;
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.button.text};
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.button.disabled};
    cursor: not-allowed;
  }
`;
