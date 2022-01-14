import { useReactiveVar } from '@apollo/client';
import styled from '@emotion/styled';
import type { NextPage } from 'next';
import Link from 'next/link';
import { isLoggedInVar } from '../apollo';
import PageTitle from '../components/common/PageTitle';

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <div>
      <PageTitle title="홈" />
      <h1>H1</h1>
      <Link href="/login">
        <a>Login</a>
      </Link>
      {isLoggedIn ? <div>Login</div> : <div>Logout</div>}
      <Text>Home</Text>
    </div>
  );
};

export default Home;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  @media (min-width: ${({ theme }) => theme.mediaQuery.mobile}) {
    color: ${({ theme }) => theme.colors.red};
  }
`;
