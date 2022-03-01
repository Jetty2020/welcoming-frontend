import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { ChevronLeft } from 'public/icons';
import { pxToRem } from '@utils/pxToRem';
import { EmailForm } from '@components/auth/password-reset/EmailForm';
import { CheckCodeForm } from '@components/auth/password-reset/CheckCodeForm';
import { genCode } from '@utils/genCode';
import { AuthFooter } from '@components/auth/Footer';
import { PasswordForm } from '@components/auth/password-reset/PasswordForm';
import { GRAY_900 } from '@constants/colors';

const PasswordReset: NextPage = () => {
  const router = useRouter();
  const [codeForm, setCodeForm] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const email = useRef('');
  const code = useRef(genCode());

  return (
    <MainPasswordReset>
      <Header>
        <BtnClose type="button" onClick={() => router.push('/auth/sign-in')}>
          <ChevronLeft />
          <span className="sr-only">뒤로가기</span>
        </BtnClose>
        <span>비밀번호 재설정</span>
      </Header>
      <SectionPasswordReset>
        <h2 className="sr-only">비밀번호 재설정</h2>
        {!showPasswordForm ? (
          <>
            <EmailForm
              code={code.current}
              email={email}
              codeForm={codeForm}
              setCodeForm={setCodeForm}
            />
            {codeForm && (
              <CheckCodeForm
                code={code.current}
                email={email}
                setShowPasswordForm={setShowPasswordForm}
              />
            )}
          </>
        ) : (
          <PasswordForm email={email} />
        )}
      </SectionPasswordReset>
      <AuthFooter />
    </MainPasswordReset>
  );
};

export default PasswordReset;

const MainPasswordReset = styled.main`
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
  background-color: ${({ theme }) => theme.background.default};
  color: ${({ theme }) => theme.text.default};
`;

const BtnClose = styled.button`
  position: absolute;
  top: 50%;
  left: ${pxToRem(15)};
  transform: translateY(-50%);
  font-size: 0;

  & svg {
    width: ${pxToRem(20)};
    height: ${pxToRem(20)};
  }
`;

const SectionPasswordReset = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${pxToRem(450)};
  padding: ${pxToRem(30)};
  margin-top: ${pxToRem(50)};
  box-sizing: border-box;
  flex: 1;
`;
