import type { NextPage } from 'next';
import { gql, useQuery } from '@apollo/client';
import PageTitle from '@components/common/PageTitle';
import {
  getEventsQuery,
  getEventsQueryVariables,
} from '@generated/getEventsQuery';
import { Layout } from '@components/layouts/Layout';
import { Carousel } from '@components/landing/Carousel';
import { Category } from '@components/landing/Category';
import { WelcomeDeal } from '@components/landing/WelcomeDeal';
import { Best } from '@components/landing/Best';

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

  console.log(evnetsData?.getEvents, evnetsLoading);
  return (
    <>
      <PageTitle title="홈" />
      <Layout>
        <main>
          <Carousel />
          <Category />
          <WelcomeDeal />
          <Best />
        </main>
      </Layout>
    </>
  );
};

export default Home;
