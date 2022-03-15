import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Cart: NextPage = () => {
  return (
    <>
      <PageTitle title="장바구니" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Cart;
