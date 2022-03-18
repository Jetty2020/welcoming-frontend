import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const RegisterProduct: NextPage = () => {
  return (
    <>
      <PageTitle title="상품 등록" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default RegisterProduct;
