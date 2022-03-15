import Head from 'next/head';

const PageTitle = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{title} | 어서와 우리집</title>
    </Head>
  );
};

export default PageTitle;
