import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Privacy: NextPage = () => {
  return (
    <>
      <PageTitle title="개인정보처리방침" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Privacy;
