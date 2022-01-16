import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '../components/common/PageTitle';
import {
  getTodayDealPostQuery,
  getTodayDealPostQueryVariables,
} from '../__generated__/getTodayDealPostQuery';

const Home: NextPage = () => {
  const TODAYDEAL_QUERY = gql`
    query getTodayDealPostQuery($todayDealInput: GetTodayDealPostInput!) {
      getTodayDealPost(input: $todayDealInput) {
        ok
        error
        posts {
          id
          title
          ori_price
          selling_price
        }
      }
    }
  `;

  const { data, loading } = useQuery<
    getTodayDealPostQuery,
    getTodayDealPostQueryVariables
  >(TODAYDEAL_QUERY, {
    variables: {
      todayDealInput: {
        postNum: 4,
      },
    },
  });
  console.log(data, loading);
  return (
    <div>
      <PageTitle title="홈" />
      <Text>Home</Text>
    </div>
  );
};

export default Home;

const Text = styled.p`
  color: ${({ theme }) => theme.text.primary};
  @media (min-width: ${({ theme }) => theme.mediaQuery.mobile}) {
    color: ${({ theme }) => theme.text.primary};
  }
`;
