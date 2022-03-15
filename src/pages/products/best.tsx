import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Best: NextPage = () => {
  return (
    <>
      <PageTitle title="베스트" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Best;
