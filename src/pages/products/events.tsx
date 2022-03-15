import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Events: NextPage = () => {
  return (
    <>
      <PageTitle title="기획전" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Events;
