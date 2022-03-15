import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const CSCenter: NextPage = () => {
  return (
    <>
      <PageTitle title="고객센터" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default CSCenter;
