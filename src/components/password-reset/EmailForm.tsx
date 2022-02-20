import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { pxToRem } from '@utils/pxToRem';
import {
  sendEmailMutation,
  sendEmailMutationVariables,
} from '@generated/sendEmailMutation';

interface EmailFormPros {
  code: string;
  codeForm: boolean;
  setCodeForm: (value: boolean) => void;
  email: { current: string };
}

export const SEND_EMAIL_MUTATION = gql`
  mutation sendEmailMutation($sendEmailInput: SendEmailInput!) {
    sendEmail(input: $sendEmailInput) {
      ok
      error
    }
  }
`;

export const EmailForm = ({
  code,
  codeForm,
  setCodeForm,
  email,
}: EmailFormPros) => {
  const [checkEmail, setCheckEmail] = useState('');

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    email: string;
  }>({
    mode: 'onChange',
  });

  const disabledBtn = useMemo(() => {
    if (codeForm) {
      return true;
    }
    return !isValid;
  }, [isValid, codeForm]);

  const onCompleted = (data: sendEmailMutation) => {
    const {
      sendEmail: { ok, error },
    } = data;
    if (ok) {
      setCodeForm(true);
      email.current = getValues().email;
    } else if (error === '존재하지 않는 계정입니다') {
      setCheckEmail('등록된 이메일 주소가 아닙니다.');
    } else {
      setCheckEmail('이메일 전송에 실패했습니다.');
    }
  };

  const [sendEmailMutation, { loading }] = useMutation<
    sendEmailMutation,
    sendEmailMutationVariables
  >(SEND_EMAIL_MUTATION, {
    onCompleted,
  });

  const sendEmail = () => {
    if (!loading) {
      const { email } = getValues();
      sendEmailMutation({
        variables: {
          sendEmailInput: {
            email,
            code,
          },
        },
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(sendEmail)}>
      <TextPasswordReset>가입한 이메일 주소를 입력해주세요.</TextPasswordReset>
      <Label htmlFor="email" data-form-error={Boolean(checkEmail)}>
        <Input
          type="text"
          id="email"
          placeholder="이메일"
          disabled={codeForm}
          {...register('email', {
            required: true,
            onChange: () => setCheckEmail(''),
          })}
        />
      </Label>
      {checkEmail && <Error>{checkEmail}</Error>}
      <BtnEmail type="submit" disabled={disabledBtn}>
        이메일로 인증코드 받기
      </BtnEmail>
    </Form>
  );
};

const TextPasswordReset = styled.p`
  margin-bottom: ${pxToRem(12)};
  color: ${({ theme }) => theme.text.default};
  font-size: ${pxToRem(14)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  overflow: hidden;
  position: relative;
  border: ${({ theme }) => theme.input.border};
  border-radius: ${pxToRem(5)};

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

const BtnEmail = styled.button`
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
