import type { NextPage } from 'next';
import styled from '@emotion/styled';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '../components/common/PageTitle';
import {
  getTodayDealPostQuery,
  getTodayDealPostQueryVariables,
} from '../__generated__/getTodayDealPostQuery';
import {
  getEventsQuery,
  getEventsQueryVariables,
} from '../__generated__/getEventsQuery';
import {
  getAllPostsQuery,
  getAllPostsQueryVariables,
} from '../__generated__/getAllPostsQuery';
import { Carousel } from '../components/landing/Carousel';

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
  const EVENT_QUERY = gql`
    query getEventsQuery($getEventsInput: GetEventsInput!) {
      getEvents(input: $getEventsInput) {
        ok
        error
        events {
          id
          carouselImg
          carouselTitle
        }
      }
    }
  `;

  const GETALLPOSTS_QUERY = gql`
    query getAllPostsQuery($getAllPostsInput: AllPostsInput!) {
      getAllPosts(input: $getAllPostsInput) {
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

  const { data: todayDealData, loading: todayDealLoading } = useQuery<
    getTodayDealPostQuery,
    getTodayDealPostQueryVariables
  >(TODAYDEAL_QUERY, {
    variables: {
      todayDealInput: {
        postNum: 4,
      },
    },
  });

  const { data: evnetsData, loading: evnetsLoading } = useQuery<
    getEventsQuery,
    getEventsQueryVariables
  >(EVENT_QUERY, {
    variables: {
      getEventsInput: {
        eventNum: 6,
      },
    },
  });

  const { data: allPostsData, loading: allPostsLoading } = useQuery<
    getAllPostsQuery,
    getAllPostsQueryVariables
  >(GETALLPOSTS_QUERY, {
    variables: {
      getAllPostsInput: {
        order: 0,
        page: 1,
      },
    },
  });
  console.log(evnetsData?.getEvents, evnetsLoading);
  console.log(todayDealData?.getTodayDealPost, todayDealLoading);
  console.log(allPostsData?.getAllPosts, allPostsLoading);
  return (
    <div>
      <PageTitle title="홈" />
      <Carousel />
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
