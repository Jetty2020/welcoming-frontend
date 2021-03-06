import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import Link from 'next/link';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { AuthFooter } from '@components/auth/Footer';
import PageTitle from '@components/common/PageTitle';
import {
  createAccountMutation,
  createAccountMutationVariables,
} from '@generated/createAccountMutation';
import { UserRole } from '@generated/globalTypes';
import { pxToRem } from '@utils/pxToRem';
import Close from 'public/icons/close.svg';
import { GRAY_500, GRAY_900, PRIMARY, WHITE } from '@constants/colors';
import { ROUTES } from '@constants/routes';

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface SignInInput {
  email: string;
  nickname: string;
  password: string;
  passwordCheck: string;
  agreeAge: boolean;
  agreeTerm: boolean;
  agreePrivacy: boolean;
}

const SignUp: NextPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const [emailError, setEmailError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [agreeAllValue, setAgreeAllValue] = useState(false);

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<SignInInput>({
    mode: 'onChange',
  });

  const handleCheckAll = () => {
    setValue('agreeAge', !agreeAllValue);
    setValue('agreeTerm', !agreeAllValue);
    setValue('agreePrivacy', !agreeAllValue);
    setAgreeAllValue((state) => !state);
  };

  const handleCheckbox = () => {
    if (
      getValues().agreeAge === true &&
      getValues().agreePrivacy === true &&
      getValues().agreeTerm === true
    ) {
      setAgreeAllValue(true);
    } else if (agreeAllValue) {
      setAgreeAllValue(false);
    }
  };

  const handlePasswardCheckBlur = () => {
    const { password, passwordCheck } = getValues();
    if (password !== passwordCheck) {
      setPasswordCheckError(true);
    }
  };

  const regExpEm =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const regExpPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;

  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok, error },
    } = data;

    if (ok) {
      router.push('/auth/sign-in');
    } else if (error === '?????? ?????? ????????? ???????????? ???????????????.') {
      setEmailError(true);
    } else if (error === '?????? ?????? ????????? ???????????? ??????????????????.') {
      setNicknameError(true);
    }
  };

  const [createAccountMutation, { loading }] = useMutation<
    createAccountMutation,
    createAccountMutationVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password, nickname } = getValues();

      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            nickname,
            role: UserRole.Client,
          },
        },
      });
    }
  };

  return (
    <MainSignUp>
      <PageTitle title="????????????" />
      <Header>
        <BtnClose type="button" onClick={() => router.back()}>
          <IconClose />
          <span className="sr-only">????????????</span>
        </BtnClose>
        <span>????????????</span>
      </Header>
      <SectionSignUp>
        <h2 className="sr-only">????????????</h2>
        <ContainerLogo>
          <img src={theme.logo.src} alt="????????? ????????? ??????" />
        </ContainerLogo>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="emailDomain">
            ?????????
            <Input
              type="text"
              placeholder="?????????"
              data-sign-up-error={emailError || Boolean(errors.email?.type)}
              {...register('email', {
                required: true,
                pattern: regExpEm,
                onChange: () => setEmailError(false),
              })}
            />
          </Label>
          {errors.email?.type === 'required' && (
            <TextError>?????? ?????? ???????????????.</TextError>
          )}
          {errors.email?.type === 'pattern' && (
            <TextError>????????? ????????? ???????????? ????????????.</TextError>
          )}
          {emailError && <TextError>?????? ????????? ??????????????????.</TextError>}
          <Label htmlFor="password">
            ????????????
            <Desc>??????, ????????? ????????? 6~12????????? ??????????????? ??????????????????.</Desc>
            <Input
              type="password"
              placeholder="????????????"
              data-sign-up-error={Boolean(errors.password?.type)}
              {...register('password', {
                required: true,
                pattern: regExpPw,
              })}
            />
          </Label>
          {errors?.password?.type === 'required' && (
            <TextError>?????? ?????? ???????????????.</TextError>
          )}
          {errors?.password?.type === 'pattern' && (
            <TextError>
              ??????????????? ??????(???/????????? ??????), ?????? ???????????? 6~12???????????????
              ?????????.
            </TextError>
          )}

          <Label htmlFor="passwordCheck">
            ???????????? ??????
            <Input
              type="password"
              placeholder="???????????? ??????"
              data-sign-up-error={passwordCheckError}
              {...register('passwordCheck', {
                required: true,
                onChange: () => setPasswordCheckError(false),
                onBlur: handlePasswardCheckBlur,
              })}
            />
          </Label>
          {passwordCheckError && (
            <TextError>??????????????? ???????????? ????????????.</TextError>
          )}
          <Label htmlFor="nickName">
            ??????
            <Desc>?????? ????????? ????????? ?????? ????????? ??????????????????. (2~15???)</Desc>
            <Input
              type="text"
              placeholder="????????? (2~15???)"
              data-sign-up-error={
                nicknameError || Boolean(errors.nickname?.type)
              }
              {...register('nickname', {
                required: true,
                minLength: 2,
                maxLength: 15,
                onChange: () => setNicknameError(false),
              })}
            />
          </Label>
          {errors?.nickname?.type === 'required' && (
            <TextError>?????? ?????? ???????????????.</TextError>
          )}
          {(errors?.nickname?.type === 'maxLength' ||
            errors?.nickname?.type === 'minLength') && (
            <TextError>????????? 2~15??????????????? ?????????.</TextError>
          )}
          {nicknameError && <TextError>?????? ?????? ???????????????.</TextError>}
          <ContainerAgreement>
            ????????????
            <InnerContainerAgreement>
              <LabelAgreement htmlFor="agreeAll">
                <CheckBox
                  type="checkbox"
                  id="agreeAll"
                  checked={agreeAllValue}
                  onChange={handleCheckAll}
                />
                ????????????
              </LabelAgreement>
              <LabelAgreement htmlFor="agreeAge">
                <CheckBox
                  type="checkbox"
                  id="agreeAge"
                  {...register('agreeAge', {
                    onChange: handleCheckbox,
                  })}
                />
                ??? 14??? ???????????????.
                <SpanRequire>&#40;??????&#41;</SpanRequire>
              </LabelAgreement>
              <LabelAgreement htmlFor="agreeTerm">
                <CheckBox
                  type="checkbox"
                  id="agreeTerm"
                  {...register('agreeTerm', {
                    onChange: handleCheckbox,
                  })}
                />
                <Link href={ROUTES.agreement} passHref>
                  <AnchorAgreeMent target="_blank">????????????</AnchorAgreeMent>
                </Link>
                <SpanRequire>&#40;??????&#41;</SpanRequire>
              </LabelAgreement>
              <LabelAgreement htmlFor="agreePrivacy">
                <CheckBox
                  type="checkbox"
                  id="agreePrivacy"
                  {...register('agreePrivacy', {
                    onChange: handleCheckbox,
                  })}
                />
                <Link href={ROUTES.privacy} passHref>
                  <AnchorAgreeMent target="_blank">
                    ?????????????????? ??? ????????????
                  </AnchorAgreeMent>
                </Link>
                <SpanRequire>&#40;??????&#41;</SpanRequire>
              </LabelAgreement>
            </InnerContainerAgreement>
          </ContainerAgreement>
          <Button
            type="submit"
            disabled={
              !isValid ||
              !agreeAllValue ||
              emailError ||
              passwordCheckError ||
              nicknameError
            }
          >
            ??????????????????
          </Button>
        </Form>
        <TextAskID>
          ?????? ???????????? ????????????????
          <Link href={ROUTES.signIn} passHref>
            <AskIDLink>?????????</AskIDLink>
          </Link>
        </TextAskID>
      </SectionSignUp>
      <AuthFooter />
    </MainSignUp>
  );
};

export default SignUp;

const MainSignUp = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const SectionSignUp = styled.section`
  box-sizing: border-box;
  width: 100%;
  max-width: ${pxToRem(450)};
  padding: ${pxToRem(30)};
  margin: ${pxToRem(50)} 0;
`;

const ContainerLogo = styled.div`
  width: ${pxToRem(200)};
  margin: 0 auto ${pxToRem(50)};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: ${pxToRem(16)};
  font-weight: 700;

  &:not(:first-of-type) {
    margin-top: ${pxToRem(30)};
  }
`;

const Desc = styled.p`
  margin-top: ${pxToRem(12)};
  font-size: ${pxToRem(14)};
  font-weight: 400;
  line-height: 1.4;
  color: ${GRAY_500};
`;

const Input = styled.input`
  width: 100%;
  margin-top: ${pxToRem(12)};
  padding: ${pxToRem(15)};
  box-sizing: border-box;
  border: ${({ theme }) => theme.input.border};
  border-radius: ${pxToRem(5)};
  font-size: ${pxToRem(16)};

  &::placeholder {
    color: ${({ theme }) => theme.input.placeholder};
  }
  &[data-sign-up-error='true'] {
    border-color: ${({ theme }) => theme.input.error};
  }
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

const ContainerAgreement = styled.div`
  margin-top: ${pxToRem(30)};
  font-size: ${pxToRem(15)};
  font-weight: 700;
`;

const InnerContainerAgreement = styled.div`
  margin: ${pxToRem(10)} 0;
  padding: ${pxToRem(20)} ${pxToRem(10)} ${pxToRem(12)};
  border: ${({ theme }) => theme.input.border};
  background-color: ${WHITE};
  color: ${GRAY_900};
`;

const LabelAgreement = styled.label`
  display: flex;
  align-items: center;
  margin-top: ${pxToRem(12)};
  font-weight: 500;

  &[for='agreeAll'] {
    margin-top: 0;
    padding-bottom: ${pxToRem(20)};
    border-bottom: ${({ theme }) => theme.input.border};
    font-weight: 700;
  }
`;

const AnchorAgreeMent = styled.a`
  text-decoration: underline;
`;

const SpanRequire = styled.span`
  margin-left: ${pxToRem(5)};
  color: ${PRIMARY};
`;

const CheckBox = styled.input`
  display: grid;
  place-content: center;
  appearance: none;
  background-color: #fff;
  width: ${pxToRem(18)};
  height: ${pxToRem(18)};
  margin-right: ${pxToRem(10)};
  border: 1px solid ${GRAY_500};
  border-radius: ${pxToRem(2)};

  &:checked {
    border: none;
    background-color: ${({ theme }) => theme.background.primary};
  }

  &:checked::before {
    content: '';
    width: ${pxToRem(14)};
    height: ${pxToRem(14)};
    border-radius: 1px;
    box-shadow: inset ${pxToRem(14)} ${pxToRem(14)} ${WHITE};
    clip-path: polygon(15% 41%, 44% 65%, 83% 10%, 95% 20%, 47% 88%, 5% 54%);
  }
`;

const Button = styled.button`
  margin: ${pxToRem(30)} 0;
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

const TextAskID = styled.p`
  text-align: center;
`;

const AskIDLink = styled.a`
  margin-left: ${pxToRem(5)};
  font-weight: 600;
  text-decoration: underline;
`;
