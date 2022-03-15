import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Category: NextPage = () => {
  return (
    <>
      <PageTitle title="카테고리" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Category;
