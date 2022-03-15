import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Agreement: NextPage = () => {
  return (
    <>
      <PageTitle title="이용약관" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Agreement;
