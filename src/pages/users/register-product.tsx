import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Editor } from '@tinymce/tinymce-react';
import { NextPage } from 'next';
import { useState } from 'react';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';
import { pxToRem } from '@utils/pxToRem';
import QuestionIcon from 'public/icons/question-circle.svg';
import { GRAY_200, WHITE } from '@constants/colors';
import { CentralModal } from '@components/common/CentralModal';

const RegisterProduct: NextPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState<Array<File>>([]);

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImageList = e.target.files;
    const newImageList = [...imgFile];

    if (selectedImageList) {
      for (let i = 0; i < selectedImageList?.length; i += 1) {
        if (i + imgFile.length + 1 > 5) {
          break;
        }
        newImageList.push(selectedImageList[i]);
        const nowImageUrl = URL.createObjectURL(selectedImageList[i]);
        setContent(
          (state) => `${state}<img src="${nowImageUrl}" style="width: 100%">`,
        );
      }
    }
    setImgFile(newImageList);
    setIsShowModal(false);
  };

  return (
    <>
      <PageTitle title="상품 등록" />
      <Layout>
        <Main>
          <h2 className="sr-only">상품 등록 페이지</h2>
          <Form>
            <TitleForm>
              브랜드명
              <IconQuestion />
            </TitleForm>
            <Select>
              <option disabled selected>
                브랜드 선택
              </option>
              <option value="brand1">brand1</option>
              <option value="brand2">brand2</option>
              <option value="brand3">brand3</option>
            </Select>
            <TitleForm>
              상품명
              <IconQuestion />
            </TitleForm>
            <Input type="text" />
            <TitleForm>
              상품 옵션
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <LabelRadio htmlFor="use">
                <InputRadio id="use" type="radio" name="option" />
                사용함
              </LabelRadio>
              <LabelRadio htmlFor="none">
                <InputRadio id="none" type="radio" name="option" />
                사용 안함
              </LabelRadio>
            </ContainerInput>
            <TitleForm>
              상품 가격
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <LabelPrice htmlFor="normalPrice">
                판매가(원)
                <Input id="normalPrice" type="text" />
              </LabelPrice>
              <LabelPrice htmlFor="specialPrice">
                할인 이전 가격(원)
                <Input id="specialPrice" type="text" />
              </LabelPrice>
              <LabelPrice htmlFor="event">
                기획전에 추가하기
                <Select id="event">
                  <option disabled selected>
                    기획전
                  </option>
                  <option value="event1">event1</option>
                  <option value="event2">event2</option>
                  <option value="event3">event3</option>
                </Select>
              </LabelPrice>
            </ContainerInput>
            <TitleForm>
              카테고리
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <Select>
                <option disabled selected>
                  1차 분류
                </option>
                <option value="category1">category1</option>
                <option value="category2">category2</option>
                <option value="category3">category3</option>
              </Select>
              <Select>
                <option disabled selected>
                  2차 분류
                </option>
                <option value="category1">category1</option>
                <option value="category2">category2</option>
                <option value="category3">category3</option>
              </Select>
            </ContainerInput>
            <TitleForm>
              상품 이미지
              <IconQuestion />
            </TitleForm>
            <div>
              <LabelImgInput htmlFor="imageInput">
                상품 이미지 추가하기
                <input
                  className="sr-only"
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  multiple
                />
              </LabelImgInput>
              <ListImg>
                <ItemImg>
                  <ImgPreview src="/logo/logo.png" alt="상품 이미지 미리보기" />
                </ItemImg>
                <ItemImg>
                  <ImgPreview src="/logo/logo.png" alt="상품 이미지 미리보기" />
                </ItemImg>
                <ItemImg>
                  <ImgPreview src="/logo/logo.png" alt="상품 이미지 미리보기" />
                </ItemImg>
              </ListImg>
            </div>
            <TitleForm>
              상품 상세 설명
              <IconQuestion />
            </TitleForm>
            <Editor
              id="tinyEditor"
              value={content}
              onEditorChange={setContent}
              apiKey="rx4sjzylr2h5t45sq41yf4qmjellvcs73xqlmmjlwr3boa8p"
              init={{
                language: 'ko',
                menubar: false,
                statusbar: false,
                min_height: 400,
                max_height: 800,
                plugins:
                  'autolink autosave code link media image table textcolor autoresize',
                toolbar:
                  'undo redo | bold italic underline strikethrough fontsizeselect forecolor | alignleft aligncenter alignright alignjustify | custom_image ',
                setup: (editor) => {
                  editor.ui.registry.addButton('custom_image', {
                    icon: 'image',
                    onAction: () => setIsShowModal(true),
                  });
                },
              }}
            />
            <TitleForm>
              상품 배송
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <LabelRadio htmlFor="free">
                <InputRadio id="free" type="radio" name="shippingPrice" />
                무료배송
              </LabelRadio>
              <LabelRadio htmlFor="standard">
                <InputRadio id="standard" type="radio" name="shippingPrice" />
                기본 배송비 적용
              </LabelRadio>
            </ContainerInput>
            <TitleForm>
              검색 엔진 최적화
              <IconQuestion />
              <br />
              (SEO)
            </TitleForm>
            <div>
              <LabelSEO htmlFor="seoTitle">
                제목
                <Input id="seoTitle" type="text" />
              </LabelSEO>
              <LabelSEO htmlFor="seoDesc">
                메타 설명
                <Textarea id="seoDesc" />
              </LabelSEO>
            </div>
            <BtnSubmit type="submit">상품 등록하기</BtnSubmit>
          </Form>
          <CentralModal
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          >
            <FormUpload>
              <LabelUpload htmlFor="uploadImg">
                파일 선택
                <input
                  id="uploadImg"
                  className="sr-only"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImgInput}
                />
              </LabelUpload>
              {/* 이미지 크기 정해지면 수정하기 */}
              <p>
                10MB이하의 이미지 파일만 등록할 수 있습니다.
                <br />
                (JPG, GIF, PNG, BMP)
              </p>
            </FormUpload>
          </CentralModal>
        </Main>
      </Layout>
    </>
  );
};

export default RegisterProduct;

const Main = styled.main`
  max-width: ${pxToRem(1200)};
  margin: ${({ theme }) => theme.margin.tabletTop} auto 0;
  padding: 50px 50px;
`;

const Form = styled.form`
  display: grid;
  gap: 20px 0;
  grid-template-columns: 150px auto;
`;

const TitleForm = styled.em`
  display: inline-block;
  font-weight: 600;
`;

const IconQuestion = styled(QuestionIcon)`
  width: 10px;
  height: 10px;
  margin-left: 5px;
`;

const ContainerInput = styled.div`
  display: flex;
`;

const LabelRadio = styled.label`
  & + & {
    margin-left: 10px;
  }
`;

const InputRadio = styled.input`
  margin-right: 5px;
`;

const LableStyle = css`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  & input,
  & textarea,
  & select {
    margin-top: 10px;
  }
`;

const LabelPrice = styled.label`
  ${LableStyle}

  & + & {
    margin-left: 10px;
  }
`;

const InputStyle = () => css`
  box-sizing: border-box;
  width: 200px;
  padding: ${pxToRem(5)} ${pxToRem(10)};
  border-radius: ${pxToRem(5)};
  font-size: ${pxToRem(16)};
  // TODO: 컴포넌트화 이후 border 가져오기
`;

const Input = styled.input`
  ${InputStyle}
  border: ${({ theme }) => theme.input.border};
`;

const Select = styled.select`
  ${InputStyle}
  border: ${({ theme }) => theme.input.border};

  & + & {
    margin-left: 10px;
  }
`;

const LabelImgInput = styled.label`
  display: inline-block;
  width: 170px;
  margin-bottom: 20px;
  border-radius: 15px;
  background-color: ${GRAY_200};
  /* color: ${WHITE}; */
  line-height: 30px;
  text-align: center;
  cursor: pointer;
`;

const ListImg = styled.ul`
  display: flex;
`;

const ItemImg = styled.li`
  & + & {
    margin-left: 10px;
  }
`;

const ImgPreview = styled.img`
  width: 100px;
  aspect-ratio: 1/1;
  object-fit: cover;
  background-color: ${WHITE};
`;

const LabelSEO = styled.label`
  ${LableStyle}
  & + & {
    margin-top: 20px;
  }
`;

const Textarea = styled.textarea`
  ${InputStyle}
  width: 100%;
  border: ${({ theme }) => theme.input.border};
  resize: none;
`;

const BtnSubmit = styled.button`
  grid-column: 2;
  grid-row: 10;
  width: 150px;
  line-height: 30px;
  padding: 0 ${pxToRem(15)};
  border-radius: ${pxToRem(5)};
  background-color: ${({ theme }) => theme.button.background};
  font-size: ${({ theme }) => pxToRem(theme.button.fontSize)};
  font-weight: 500;
  letter-spacing: ${({ theme }) => theme.button.letterSpacing};
  color: ${({ theme }) => theme.button.text};

  &:disabled {
    background-color: ${({ theme }) => theme.button.disabled};
  }
`;

const FormUpload = styled.form`
  padding: 40px;
  font-size: 14px;
  line-height: 1.2;
  text-align: center;
`;

const LabelUpload = styled.label`
  display: block;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
  cursor: pointer;
`;
