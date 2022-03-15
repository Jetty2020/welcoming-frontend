import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Notice: NextPage = () => {
  return (
    <>
      <PageTitle title="공지사항" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Notice;
