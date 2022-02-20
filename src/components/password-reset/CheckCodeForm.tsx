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
import { GRAY_500 } from 'src/constants/colors';
import { SEND_EMAIL_MUTATION } from './EmailForm';

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
      <BtnVerification type="submit" disabled={disabledBtn}>
        인증번호 확인
      </BtnVerification>
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

const Timer = styled.span`
  position: absolute;
  top: 50%;
  right: ${pxToRem(15)};
  transform: translateY(-50%);
  color: ${({ theme }) => theme.input.error};
  font-size: ${pxToRem(14)};
`;

const TimerBox = styled.span`
  display: inline-block;
  width: 20px;
  text-align: center;
`;

const BtnVerification = styled.button`
  margin: ${pxToRem(20)} 0;
  padding: ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.background.primary};
  color: ${({ theme }) => theme.button.text};
  font-size: ${pxToRem(16)};

  &:disabled {
    background-color: ${({ theme }) => theme.button.disabled};
  }
`;

const TextResend = styled.div`
  margin-top: ${pxToRem(10)};
  color: ${GRAY_500};
  font-size: ${pxToRem(13)};
`;

const BtnResend = styled.button`
  margin-left: ${pxToRem(5)};
  font-size: ${pxToRem(13)};
  text-decoration: underline;
`;
