import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '@components/common/PageTitle';
import {
  getEventsQuery,
  getEventsQueryVariables,
} from '@generated//getEventsQuery';
import {
  getAllPostsQuery,
  getAllPostsQueryVariables,
} from '@generated//getAllPostsQuery';
import { Layout } from '@components/layouts/Layout';
import { Carousel } from '@components/landing/Carousel';
import { Category } from '@components/landing/Category';
import { WelcomeDeal } from '@components/landing/WelcomeDeal';

const Home: NextPage = () => {
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
  console.log(allPostsData?.getAllPosts, allPostsLoading);
  return (
    <>
      <PageTitle title="홈" />
      <Layout>
        <main>
          <Carousel />
          <Category />
          <WelcomeDeal />
        </main>
      </Layout>
    </>
  );
};

export default Home;
