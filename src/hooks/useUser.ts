import { isLoggedInVar, userLogout } from '@apollo';
import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { meQuery } from '@generated/meQuery';
import { useEffect } from 'react';

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      nickname
      role
    }
  }
`;

export const useUser = () => {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<meQuery>(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      userLogout();
    }
  }, [data]);
  return { data, loading };
};
