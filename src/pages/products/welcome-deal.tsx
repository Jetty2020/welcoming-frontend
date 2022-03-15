import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const WelcomeDeal: NextPage = () => {
  return (
    <>
      <PageTitle title="웰컴딜" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default WelcomeDeal;
