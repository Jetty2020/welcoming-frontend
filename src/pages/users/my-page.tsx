import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const MyPage: NextPage = () => {
  return (
    <>
      <PageTitle title="마이페이지" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default MyPage;
