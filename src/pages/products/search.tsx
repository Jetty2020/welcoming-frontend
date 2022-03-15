import { NextPage } from 'next';
import { ComingSoon } from '@components/common/ComingSoon';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const Search: NextPage = () => {
  return (
    <>
      <PageTitle title="검색" />
      <Layout>
        <ComingSoon />
      </Layout>
    </>
  );
};

export default Search;
