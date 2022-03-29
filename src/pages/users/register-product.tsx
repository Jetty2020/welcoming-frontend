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
import { useForm } from 'react-hook-form';
import { useControllOptionList } from '@hooks/useControllOptionList';
import { RegisterFormProps } from 'src/types';

const RegisterProduct: NextPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState<Array<File>>([]);
  const [previewThumbnail, setPreviewThumbnail] = useState<Array<string>>([]);
  // const [thumbnailFile, setThumbnailFile] = useState<Array<File>>([]);
  const [isCheckedOption, setIsCheckedOption] = useState(false);
  const [isAddOption, setIsAddOption] = useState(false);

  const { register, getValues, setValue, handleSubmit } =
    useForm<RegisterFormProps>({
      mode: 'onChange',
    });

  const {
    pressEnter: firstPressEnter,
    deleteProductOption: firstDeleteProductOption,
    optionList: firstOptionList,
  } = useControllOptionList(getValues, setValue);

  const {
    pressEnter: secondPressEnter,
    deleteProductOption: secondDeleteProductOption,
    optionList: secondOptionList,
  } = useControllOptionList(getValues, setValue);

  const numberFormat = () => {
    const numberPrice = +getValues()
      .price.toString()
      .replace(/[^0-9]/g, '');

    const formattedPrice = numberPrice
      .toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

    setValue('price', formattedPrice);
  };

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

  const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleRegister = () => {
    console.log(getValues().brand);
    console.log(getValues().name);
    console.log(getValues().optionName1);
    console.log(getValues().optionValue1);
    console.log(getValues().price);
    console.log(getValues().beforeDiscount);
    console.log(getValues().event);
    console.log(getValues().firstCategory);
    console.log(getValues().secondCategory);
    console.log(getValues().shippingPrice);
    console.log(getValues().SEOTitle);
    console.log(getValues().SEODesc);
  };

  return (
    <>
      <PageTitle title="상품 등록" />
      <Layout>
        <Main>
          <h2 className="sr-only">상품 등록 페이지</h2>
          <Form onSubmit={handleSubmit(handleRegister)}>
            <TitleForm>
              브랜드명
              <IconQuestion />
            </TitleForm>
            <Select defaultValue="brand1" {...register('brand')}>
              <option value="brand1">brand1</option>
              <option value="brand2">brand2</option>
              <option value="brand3">brand3</option>
            </Select>
            <TitleForm>
              상품명
              <IconQuestion />
            </TitleForm>
            <Input
              type="text"
              {...register('name', {
                required: true,
              })}
            />
            <TitleForm>
              상품 옵션
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <div>
                <LabelRadio htmlFor="use">
                  <InputRadio
                    id="use"
                    type="radio"
                    name="option"
                    onClick={() => setIsCheckedOption(true)}
                  />
                  사용함
                </LabelRadio>
                <LabelRadio htmlFor="none">
                  <InputRadio
                    id="none"
                    type="radio"
                    name="option"
                    defaultChecked={true}
                    onClick={() => setIsCheckedOption(false)}
                  />
                  사용 안함
                </LabelRadio>
              </div>
              {isCheckedOption && (
                <>
                  <ContainerProductOption>
                    <TitleProductOption>옵션 1</TitleProductOption>
                    <LabelProductOption htmlFor="nameOption">
                      옵션명
                      <InputProductOption
                        type="text"
                        id="nameOption"
                        placeholder="옵션명"
                        disabled={firstOptionList.length > 0}
                        {...register('optionName1')}
                      />
                    </LabelProductOption>
                    <LabelProductOption>
                      옵션값
                      <InputProductOption
                        type="text"
                        placeholder="옵션값을 입력 후 엔터를 눌러주세요."
                        onKeyPress={firstPressEnter}
                        {...register('optionValue1')}
                      />
                    </LabelProductOption>
                    {firstOptionList.length > 0 && (
                      <ListProductOption>
                        {firstOptionList.map((item, idx) => {
                          return (
                            <ItemProductOption key={`option-item-${uuidv4()}`}>
                              <BtnProductOption
                                type="button"
                                onClick={() => firstDeleteProductOption(idx)}
                              >
                                {getValues().optionName1} : {item}
                                <DeleteProductOption />
                              </BtnProductOption>
                            </ItemProductOption>
                          );
                        })}
                      </ListProductOption>
                    )}
                  </ContainerProductOption>
                  {!isAddOption && (
                    <BtnAddProductOption
                      type="button"
                      onClick={() => setIsAddOption(true)}
                    >
                      옵션 추가하기
                    </BtnAddProductOption>
                  )}
                  {isAddOption && (
                    <ContainerProductOption>
                      <TitleProductOption>
                        옵션 2
                        <BtnDeleteProductOption
                          type="button"
                          onClick={() => setIsAddOption(false)}
                        >
                          <span className="sr-only">옵션2 삭제</span>
                          <IconDeleteProductOption />
                        </BtnDeleteProductOption>
                      </TitleProductOption>
                      <LabelProductOption htmlFor="nameOption2">
                        옵션명
                        <InputProductOption
                          type="text"
                          id="nameOption2"
                          placeholder="옵션명"
                          disabled={secondOptionList.length > 0}
                          {...register('optionName2')}
                        />
                      </LabelProductOption>
                      <LabelProductOption>
                        옵션값
                        <InputProductOption
                          type="text"
                          placeholder="옵션값을 입력 후 엔터를 눌러주세요."
                          onKeyPress={secondPressEnter}
                          {...register('optionValue2')}
                        />
                      </LabelProductOption>
                      {secondOptionList.length > 0 && (
                        <ListProductOption>
                          {secondOptionList.map((item, idx) => {
                            return (
                              <ItemProductOption
                                key={`option-item-${uuidv4()}`}
                              >
                                <BtnProductOption
                                  type="button"
                                  onClick={() => secondDeleteProductOption(idx)}
                                >
                                  {getValues().optionName2} : {item}
                                  <DeleteProductOption />
                                </BtnProductOption>
                              </ItemProductOption>
                            );
                          })}
                        </ListProductOption>
                      )}
                    </ContainerProductOption>
                  )}
                </>
              )}
            </ContainerInput>
            <TitleForm>
              상품 가격
              <IconQuestion />
            </TitleForm>
            <ContainerInput>
              <LabelPrice htmlFor="normalPrice">
                판매가(원)
                <Input
                  id="normalPrice"
                  type="text"
                  {...register('price', {
                    required: true,
                    onBlur: numberFormat,
                  })}
                />
              </LabelPrice>
              <LabelPrice htmlFor="specialPrice">
                할인 이전 가격(원)
                <Input
                  id="specialPrice"
                  type="number"
                  {...register('beforeDiscount')}
                />
              </LabelPrice>
              <LabelPrice htmlFor="event">
                기획전에 추가하기
                <Select id="event" defaultValue="none" {...register('event')}>
                  <option value="none">기획전</option>
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
              <Select defaultValue="none" {...register('firstCategory')}>
                <option disabled value="none">
                  1차 분류
                </option>
                <option value="category1">category1</option>
                <option value="category2">category2</option>
                <option value="category3">category3</option>
              </Select>
              <Select defaultValue="none" {...register('secondCategory')}>
                <option disabled value="none">
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
                <LabelUploadThumbnail htmlFor="uploadThumbnail">
                  <input
                    type="file"
                    id="uploadThumbnail"
                    className="sr-only"
                    multiple
                    onChange={handleUploadThumbnail}
                  />
                  <IconImage />
                  사진 올리기
                  <TextUploadImg>(최대 5장까지)</TextUploadImg>
                </LabelUploadThumbnail>
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
                language: 'ko_KR',
                deprecation_warnings: false,
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
                <InputRadio
                  id="free"
                  type="radio"
                  value="free"
                  defaultChecked={true}
                  {...register('shippingPrice')}
                />
                무료배송
              </LabelRadio>
              <LabelRadio htmlFor="standard">
                <InputRadio
                  id="standard"
                  type="radio"
                  value="paid"
                  {...register('shippingPrice')}
                />
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
              <LabelSEO htmlFor="SEOTitle">
                제목
                <Input id="SEOTitle" type="text" {...register('SEOTitle')} />
              </LabelSEO>
              <LabelSEO htmlFor="SEODesc">
                메타 설명
                <Textarea id="SEODesc" {...register('SEODesc')} />
              </LabelSEO>
            </div>
            <BtnSubmit type="submit">상품 등록하기</BtnSubmit>
          </Form>
          <CentralModal
            isShowModal={isShowModal}
            setIsShowModal={setIsShowModal}
          >
            <FormUploadImg>
              <LabelUploadImg htmlFor="uploadImg">
                파일 선택
                <input
                  id="uploadImg"
                  className="sr-only"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImgInput}
                />
              </LabelUploadImg>
              {/* 이미지 크기 정해지면 수정하기 */}
              <p>
                10MB이하의 이미지 파일만 등록할 수 있습니다.
                <br />
                (JPG, GIF, PNG, BMP)
              </p>
            </FormUploadImg>
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
  font-size: 14px;
`;

const Form = styled.form`
  display: grid;
  gap: 20px 0;
  grid-template-columns: 150px auto;
`;

const TitleForm = styled.em`
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
`;

const IconQuestion = styled(QuestionIcon)`
  width: 12px;
  height: 12px;
  margin: 1px 0 0 5px;
  vertical-align: top;
`;

const ContainerInput = styled.div`
  display: flex;

  &:nth-of-type(1) {
    flex-direction: column;
  }
`;

const LabelRadio = styled.label`
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
  outline: none;

  &:focus {
    border-color: ${useTheme().text.primary};
  }
  // TODO: 컴포넌트화 이후 border 가져오기
`;

const Input = styled.input`
  ${InputStyle}
`;

const Select = styled.select`
  ${InputStyle}
  background: url('/icons/caret-down.svg') no-repeat 95% 50% ${WHITE};
  appearance: none;

  & + & {
    margin-left: 10px;
  }
`;

// 싱픔 싱세 설명: 이미지 파일 선택
const FormUploadImg = styled.form`
  padding: 40px;
  line-height: 1.2;
  text-align: center;
`;

const LabelUploadImg = styled.label`
  display: block;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
  cursor: pointer;
`;

// 상품 옵션
const ContainerProductOption = styled.div`
  margin-top: 15px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.text.lighter};
`;

const TitleProductOption = styled.p`
  position: relative;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.text.lighter};
`;

const BtnDeleteProductOption = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const IconDeleteProductOption = styled(Close)`
  width: 16px;
  height: 16px;
`;

const LabelProductOption = styled.label`
  display: flex;
  align-items: center;

  & + & {
    margin-top: 6px;
  }
`;

const InputProductOption = styled.input`
  ${InputStyle}
  flex: 1;
  margin-left: 10px;
`;

const ListProductOption = styled.ul`
  padding-left: 46px;
`;

const ItemProductOption = styled.li`
  margin-top: 5px;
`;

const BtnProductOption = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.header.background};
  box-shadow: ${({ theme }) => theme.shadow.box};
`;

const DeleteProductOption = styled(Close)`
  width: 14px;
  height: 14px;
`;

const BtnAddProductOption = styled.button`
  margin-top: 10px;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
`;

// 상품 이미지
const LabelUploadThumbnail = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  background-color: ${({ theme }) => theme.text.default};
  color: ${({ theme }) => theme.background.default};
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

// 검색 엔진 최적화
const LabelSEO = styled.label`
  ${LableStyle}

  & + & {
    margin-top: 20px;
  }
`;

const Textarea = styled.textarea`
  ${InputStyle}
  width: 100%;
  font-family: inherit;
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
