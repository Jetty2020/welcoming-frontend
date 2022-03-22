import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Editor } from '@tinymce/tinymce-react';
import { NextPage } from 'next';
import React, { useState } from 'react';
import PageTitle from '@components/common/PageTitle';
import { Layout } from '@components/layouts/Layout';
import { pxToRem } from '@utils/pxToRem';
import QuestionIcon from 'public/icons/question-circle.svg';
import { GRAY_900, WHITE } from '@constants/colors';
import { CentralModal } from '@components/common/CentralModal';
import Close from 'public/icons/close.svg';
import Image from 'public/icons/image.svg';
import { v4 as uuidv4 } from 'uuid';

const RegisterProduct: NextPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState<Array<File>>([]);
  const [previewThumbnail, setPreviewThumbnail] = useState<Array<string>>([]);
  // const [thumbnailFile, setThumbnailFile] = useState<Array<File>>([]);

  const handleImgInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImgList = e.target.files;
    const newImageList = [...imgFile];

    if (selectedImgList) {
      for (let i = 0; i < selectedImgList?.length; i += 1) {
        if (i + imgFile.length + 1 > 5) {
          break;
        }
        newImageList.push(selectedImgList[i]);
        const nowImageUrl = URL.createObjectURL(selectedImgList[i]);
        setContent(
          (state) => `${state}<img src="${nowImageUrl}" style="width: 100%" />`,
        );
      }
    }
    setImgFile(newImageList);
    setIsShowModal(false);
  };

  const handleUploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedThumbnailList = e.target.files;

    if (selectedThumbnailList) {
      for (let i = 0; i < selectedThumbnailList?.length; i += 1) {
        if (i + previewThumbnail.length + 1 > 5) {
          break;
        }
        const nowthumbnailUrl = URL.createObjectURL(selectedThumbnailList[i]);
        setPreviewThumbnail((state) => [...state, nowthumbnailUrl]);
      }
    }
  };

  const deleteThumbnail = (idx: number) => {
    setPreviewThumbnail((state) => state.filter((_, i) => i !== idx));
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
              <div>
                <LabelRadio htmlFor="use">
                  <InputRadio id="use" type="radio" name="option" />
                  사용함
                </LabelRadio>
                <LabelRadio htmlFor="none">
                  <InputRadio id="none" type="radio" name="option" />
                  사용 안함
                </LabelRadio>
              </div>
              <ContainerProductOption>
                <TitleProductOption>옵션 1</TitleProductOption>
                <LabelProductOption htmlFor="nameOption">
                  옵션명
                  <InputProductOption
                    type="text"
                    id="nameOption"
                    placeholder="예시: 색상"
                  />
                </LabelProductOption>
                <LabelProductOption>
                  옵션값
                  <BoxTag>
                    <BtnTag>
                      <span>태그명</span>
                      <BtnDeleteTag>
                        <span className="sr-only">삭제</span>
                        <IconClose />
                      </BtnDeleteTag>
                    </BtnTag>
                    <InputProductOptionValue
                      type="text"
                      placeholder="예시: 화이트"
                    />
                  </BoxTag>
                </LabelProductOption>
              </ContainerProductOption>
              <BtnAddProductOption type="button">
                옵션 추가하기
              </BtnAddProductOption>
              <ContainerProductOption>
                <TitleProductOption>옵션 2</TitleProductOption>
                <LabelProductOption htmlFor="nameOption">
                  옵션명
                  <InputProductOption
                    type="text"
                    id="nameOption"
                    placeholder="예시: 색상"
                  />
                </LabelProductOption>
                <LabelProductOption>
                  옵션값
                  <BoxTag>
                    <BtnTag>
                      <span>태그명</span>
                      <BtnDeleteTag>
                        <span className="sr-only">삭제</span>
                        <IconClose />
                      </BtnDeleteTag>
                    </BtnTag>
                    <InputProductOptionValue
                      type="text"
                      placeholder="예시: 화이트"
                    />
                  </BoxTag>
                </LabelProductOption>
              </ContainerProductOption>
            </ContainerInput>
            <TitleForm>
              상품 가격
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <LabelPrice htmlFor="normalPrice">
                판매가(원)
                <Input id="normalPrice" type="number" />
              </LabelPrice>
              <LabelPrice htmlFor="specialPrice">
                할인 이전 가격(원)
                <Input id="specialPrice" type="number" />
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
            <ContainerInput>
              <ListImg>
                {previewThumbnail.map((thumnail, idx) => {
                  return (
                    <ItemImg key={`list-thumbnail-${uuidv4()}`}>
                      <button
                        type="button"
                        onClick={() => deleteThumbnail(idx)}
                      >
                        <IconDelete />
                        <ImgPreview src={thumnail} alt="상품 이미지 미리보기" />
                      </button>
                    </ItemImg>
                  );
                })}
              </ListImg>
              {previewThumbnail.length < 5 && (
                <LabelUploadImg htmlFor="uploadImg">
                  <input
                    type="file"
                    id="uploadImg"
                    className="sr-only"
                    multiple
                    onChange={handleUploadImg}
                  />
                  <IconImage />
                  사진 올리기
                  <TextUploadImg>(최대 5장까지)</TextUploadImg>
                </LabelUploadImg>
              )}
            </ContainerInput>
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

  &:nth-of-type(1) {
    flex-direction: column;
  }
`;

const LabelRadio = styled.label`
  font-size: 14px;

  & + & {
    margin-left: 10px;
  }
`;

const InputRadio = styled.input`
  margin-right: 5px;
`;

const LableStyle = () => css`
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
  width: 200px;
  padding: ${pxToRem(8)} ${pxToRem(10)};
  box-sizing: border-box;
  border: ${useTheme().input.border};
  border-radius: ${pxToRem(5)};
  background-color: ${WHITE};
  font-size: ${pxToRem(14)};
  outline: none;

  &:focus {
    border-color: ${useTheme().text.primary};
  }
  // TODO: 컴포넌트화 이후 border 가져오기
`;

const Input = styled.input`
  ${InputStyle}
  border: ${({ theme }) => theme.input.border};
`;

const Select = styled.select`
  ${InputStyle}
  border: ${({ theme }) => theme.input.border};
  background: url('/icons/caret-down.svg') no-repeat 95% 50% ${WHITE};
  appearance: none;

  & + & {
    margin-left: 10px;
  }
`;

const ListImg = styled.ul`
  display: flex;
  margin-right: 10px;
`;

const ItemImg = styled.li`
  position: relative;
  margin-left: 10px;
  cursor: pointer;

  &:hover svg {
    opacity: 1;
  }
`;

const ImgPreview = styled.img`
  width: 120px;
  aspect-ratio: 1/1;
  object-fit: cover;
  background-color: ${WHITE};
`;

const IconDelete = styled(Close)`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  fill: ${WHITE};
  filter: drop-shadow(2px 2px 1px ${GRAY_900});
  opacity: 0;
  transition: opacity 0.2s;
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

const ContainerProductOption = styled.div`
  margin-top: 15px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text.lighter};
  font-size: 14px;
`;

const TitleProductOption = styled.p`
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.text.lighter};
`;

const LabelProductOption = styled.label`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 6px;
  }
`;

const BoxTag = styled.span`
  ${InputStyle}
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 90%;
  margin-left: 10px;
  padding: 5px 10px;

  &:focus-within {
    border-color: ${({ theme }) => theme.text.primary};
  }
`;

const BtnTag = styled.button`
  padding: 2px 5px 3px 10px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.background.primary};
  color: ${WHITE};
  font-size: 14px;
  vertical-align: middle;
`;

const BtnDeleteTag = styled.span`
  display: inline-block;
  width: 14px;
  margin-left: 3px;
  line-height: 14px;
  border-radius: 50%;
  background-color: ${WHITE};
`;

const InputProductOption = styled.input`
  ${InputStyle}
  margin-left: 10px;
`;

const InputProductOptionValue = styled.input`
  padding-left: 10px;
  border: 0;
  outline: none;
`;

const IconClose = styled(Close)`
  width: 8px;
  margin-bottom: 1px;
  color: ${GRAY_900};
`;

const BtnAddProductOption = styled.button`
  margin-top: 10px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
`;

const LabelUploadImg = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
  font-size: 14px;
  cursor: pointer;
`;

const IconImage = styled(Image)`
  width: 30px;
  margin-bottom: 5px;
`;

const TextUploadImg = styled.span`
  margin-top: 5px;
  font-size: 12px;
`;
