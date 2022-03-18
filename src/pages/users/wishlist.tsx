import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Wishlist: NextPage = () => {
  return (
    <>
      <PageTitle title="위시리스트" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Wishlist;
