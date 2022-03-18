import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const EditProfile: NextPage = () => {
  return (
    <>
      <PageTitle title="개인 정보 수정" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default EditProfile;
