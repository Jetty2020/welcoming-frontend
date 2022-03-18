import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const ApplySeller: NextPage = () => {
  return (
    <>
      <PageTitle title="판매자 신청하기" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default ApplySeller;
