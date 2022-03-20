import styled from '@emotion/styled';
import { NextPage } from 'next';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';

const RegisterProduct: NextPage = () => {
  return (
    <>
      <PageTitle title="상품 등록" />
      <Layout>
        <Main>
          <h2 className="sr-only">상품 등록 페이지</h2>
          <form>
            <div>
              <em>브랜드명</em>
              <select>
                <option disabled selected>
                  브랜드 선택
                </option>
                <option value="brand1">brand1</option>
                <option value="brand2">brand2</option>
                <option value="brand3">brand3</option>
              </select>
            </div>
            <div>
              <em>상품명</em>
              <input type="text" />
            </div>
            <div>
              <em>상품 옵션</em>
              <label htmlFor="use">
                <input id="use" type="radio" name="option" />
                <span>사용함</span>
              </label>
              <label htmlFor="none">
                <input id="none" type="radio" name="option" />
                <span>사용 안함</span>
              </label>
            </div>
            <div>
              <em>상품 가격</em>
              <label htmlFor="normalPrice">
                <span>판매가(원)</span>
                <input id="normalPrice" type="text" />
              </label>
              <label htmlFor="specialPrice">
                <span>할인 이전 가격(원)</span>
                <input id="specialPrice" type="text" />
              </label>
              <label htmlFor="event">
                <span>기획전에 추가하기</span>
                <select id="event">
                  <option disabled selected>
                    기획전
                  </option>
                  <option value="event1">event1</option>
                  <option value="event2">event2</option>
                  <option value="event3">event3</option>
                </select>
              </label>
            </div>
            <div>
              <em>카테고리</em>
              <select>
                <option disabled selected>
                  1차 분류
                </option>
                <option value="category1">category1</option>
                <option value="category2">category2</option>
                <option value="category3">category3</option>
              </select>
              <select>
                <option disabled selected>
                  2차 분류
                </option>
                <option value="category1">category1</option>
                <option value="category2">category2</option>
                <option value="category3">category3</option>
              </select>
            </div>
            <div>
              <em>상품 이미지</em>
              <label htmlFor="imageInput">
                <span>상품 이미지 추가하기</span>
                <input id="imageInput" type="file" accept="image/*" multiple />
              </label>
              <span>
                상품 이미지는 최대 5개까지 등록할 수 있습니다. 상품 이미지의 첫
                번째 이미지는 대표 이미지로 지정됩니다.
              </span>
              <ul>
                <li>
                  <img src="/logo" alt="상품 이미지 미리보기" />
                </li>
              </ul>
            </div>
            <div>
              <em>상품 상세 설명</em>
              <textarea />
            </div>
            <div>
              <span>상품 배송</span>
              <label htmlFor="free">
                <input id="free" type="radio" name="shippingPrice" />
                <span>무료배송</span>
              </label>
              <label htmlFor="standard">
                <input id="standard" type="radio" name="shippingPrice" />
                <span>기본 배송비 적용</span>
              </label>
              <p>
                * 무료배송을 선택하면 해당 상품에 ‘무료배송’ 배지가 자동으로
                생성됩니다.
              </p>
            </div>
            <div>
              <em>
                검색 엔진 최적화
                <br />
                (SEO)
              </em>
              <label htmlFor="seoTitle">
                <span>제목</span>
                <input id="seoTitle" type="text" />
              </label>
              <label htmlFor="seoDesc">
                <span>메타 설명</span>
                <input id="seoDesc" type="text" />
              </label>
            </div>
            <button type="submit">상품 등록하기</button>
          </form>
        </Main>
      </Layout>
    </>
  );
};

export default RegisterProduct;

const Main = styled.main`
  margin: ${({ theme }) => theme.margin.tabletTop} auto 0;
`;
