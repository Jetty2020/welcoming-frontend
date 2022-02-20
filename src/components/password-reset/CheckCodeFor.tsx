import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { pxToRem } from '@utils/pxToRem';
import {
  sendEmailMutation,
  sendEmailMutationVariables,
} from '@generated/sendEmailMutation';
import { genCode } from '@utils/genCode';
import { SEND_EMAIL_MUTATION } from './EmailFor';

interface CheckCodeFormProps {
  code: string;
  email: { current: string };
  setShowPasswordForm: (value: boolean) => void;
}

export const CheckCodeForm = ({
  code,
  email,
  setShowPasswordForm,
}: CheckCodeFormProps) => {
  const [newCode, setNewCode] = useState(code);
  const [errorMessage, setErrorMessage] = useState('');
  const verifyTime = useRef(180);
  const [timer, setTimer] = useState(verifyTime.current);

  const padNumber = useCallback((num: number, length: number) => {
    return String(num).padStart(length, '0');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((state) => (state > 0 ? state - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!timer) {
      setErrorMessage('인증코드가 만료되었습니다.');
    }
  }, [timer]);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<{
    code: string;
  }>({
    mode: 'onChange',
  });

  const onCompleted = (data: sendEmailMutation) => {
    const {
      sendEmail: { ok },
    } = data;
    if (ok) {
      setTimer(verifyTime.current);
      setErrorMessage('');
    }
  };

  const [sendEmailMutation, { loading }] = useMutation<
    sendEmailMutation,
    sendEmailMutationVariables
  >(SEND_EMAIL_MUTATION, {
    onCompleted,
  });

  const sendEmail = () => {
    const genNewCode = genCode();
    setNewCode(genNewCode);
    if (!loading) {
      sendEmailMutation({
        variables: {
          sendEmailInput: {
            email: email.current,
            code: genNewCode,
          },
        },
      });
    }
  };

  const disabledBtn = useMemo(
    () => errorMessage === '인증코드가 만료되었습니다.' || !isValid,
    [isValid, errorMessage],
  );

  const checkCode = () => {
    if (newCode.toString() === getValues().code) {
      setShowPasswordForm(true);
    } else {
      setErrorMessage('올바른 인증코드가 아닙니다.');
    }
  };

  return (
    <Form onSubmit={handleSubmit(checkCode)}>
      <Label htmlFor="verification" data-form-error={Boolean(errorMessage)}>
        <Input
          type="text"
          id="verification"
          placeholder="인증코드 6자리 입력"
          disabled={errorMessage === '인증코드가 만료되었습니다.'}
          {...register('code', {
            required: true,
            minLength: 6,
            maxLength: 6,
            onChange: () => setErrorMessage(''),
          })}
        />
        <Timer>
          <TimerBox>{padNumber(Math.floor(timer / 60), 2)}</TimerBox> :{' '}
          <TimerBox>{padNumber(timer % 60, 2)}</TimerBox>
        </Timer>
      </Label>
      {errorMessage && <Error>{errorMessage}</Error>}
      <TextResend>
        인증코드를 받지 못하셨나요?
        <BtnResend type="button" onClick={sendEmail}>
          인증코드 재전송하기
        </BtnResend>
      </TextResend>
      <BtnEmail type="submit" disabled={disabledBtn}>
        인증번호 확인
      </BtnEmail>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  overflow: hidden;
  position: relative;
  border: 1px solid #dbdbdb;
  border-radius: ${pxToRem(5)};

  &[data-form-error='true'] {
    border-color: #ff003e;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: 0;
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: #dbdbdb;
  }
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

const Timer = styled.span`
  position: absolute;
  top: 50%;
  right: ${pxToRem(15)};
  transform: translateY(-50%);
  color: #ff003e;
  font-size: ${pxToRem(14)};
`;
const TimerBox = styled.span`
  display: inline-block;
  width: 20px;
  text-align: center;
`;

const BtnEmail = styled.button`
  margin: ${pxToRem(20)} 0;
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.bg.primary};
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.bg.darkBtn};
  }
`;

const TextResend = styled.div`
  margin-top: ${pxToRem(10)};
  color: #828c94;
  font-size: ${pxToRem(13)};
`;

const BtnResend = styled.button`
  margin-left: ${pxToRem(5)};
  font-size: ${pxToRem(13)};
  text-decoration: underline;
`;
