import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const OrderList: NextPage = () => {
  return (
    <>
      <PageTitle title="주문내역" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default OrderList;
