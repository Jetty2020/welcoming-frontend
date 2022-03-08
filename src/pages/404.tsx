import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';
import styled from '@emotion/styled';

const Error404 = () => {
  // TODO: 404이미지 다크모드 적용하기 위해 theme 생성
  return (
    <>
      <PageTitle title="Page Not found" />
      <Layout>
        <Main>
          <Img404 src="/logo/logo.png" alt="404에러 이미지" />
          <Text404>404 : 페이지를 찾을 수 없습니다.</Text404>
        </Main>
      </Layout>
    </>
  );
};

export default Error404;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 450px;
  height: calc(100vh - 535px);
  margin: 105px auto 0;
`;

const Img404 = styled.img`
  max-width: 60%;
  margin-bottom: 40px;
`;

const Text404 = styled.p`
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  word-break: keep-all;
`;
