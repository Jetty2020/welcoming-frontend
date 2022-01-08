import { useReactiveVar } from '@apollo/client';
import { NextPage } from 'next';
import Link from 'next/link';
import { isLoggedInVar } from '../../apollo';

const Login: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <div>
      {isLoggedIn ? <div>Login</div> : <div>Logout</div>}
      <Link href="/">
        <a>Home</a>
      </Link>
      <button type="button" onClick={() => isLoggedInVar(!isLoggedIn)}>
        login
      </button>
    </div>
  );
};

export default Login;
