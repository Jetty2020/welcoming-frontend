import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Editor } from '@tinymce/tinymce-react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
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
import { useControllOptionList } from '@hooks/useControllOptionList';
import { RegisterFormProps } from 'src/types';
import { priceFormat } from '@utils/priceFormat';
import { CATEGORY } from '@constants/category';

const RegisterProduct: NextPage = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState<Array<File>>([]);
  const [previewThumbnail, setPreviewThumbnail] = useState<Array<string>>([]);
  // const [thumbnailFile, setThumbnailFile] = useState<Array<File>>([]);
  const [isCheckedOption, setIsCheckedOption] = useState(false);
  const [isAddOption, setIsAddOption] = useState(false);
  const [isPriceErr, setIsPriceErr] = useState(false);
  const [selectCategory, setSelectCategory] = useState(-1);

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

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const stringPrice = e.target.value;
    const formattedPrice = priceFormat(stringPrice);

    if (
      e.target.value !== '' &&
      (e.target.name === 'price' || e.target.name === 'beforeDiscount')
    ) {
      setValue(e.target.name, formattedPrice);
    }

    if (
      +getValues().beforeDiscount > 0 &&
      +getValues().price.replace(/,/g, '') >
        +getValues().beforeDiscount.replace(/,/g, '')
    ) {
      setIsPriceErr(true);
    } else {
      setIsPriceErr(false);
    }
  };

  const handelOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/,/g, '');
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
              <Tooltips>상품을 등록할 브랜드를 선택해주세요.</Tooltips>
            </TitleForm>
            <InnerContainer>
              <Select defaultValue="brand1" {...register('brand')}>
                <option value="brand1">brand1</option>
                <option value="brand2">brand2</option>
                <option value="brand3">brand3</option>
              </Select>
            </InnerContainer>
            <TitleForm>상품명</TitleForm>
            <Input
              type="text"
              placeholder="상품명을 입력해주세요."
              {...register('name', {
                required: true,
              })}
            />
            <TitleForm>
              상품 옵션
              <IconQuestion />
              <Tooltips>상품 옵션은 최대 2개까지 설정할 수 있습니다.</Tooltips>
            </TitleForm>
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
            </div>
            <TitleForm>
              상품 가격
              <IconQuestion />
              <Tooltips>
                판매가를 입력하지 않으면 할인 이전 가격이 판매가로 등록됩니다.
              </Tooltips>
            </TitleForm>
            <InnerContainer>
              <Tooltips>
                판매가를 입력하지 않으면 할인 이전 가격이 실제 판매가로
                등록됩니다.
              </Tooltips>
              <LabelPrice htmlFor="normalPrice">
                판매가(원)
                <Input
                  id="normalPrice"
                  type="text"
                  onFocus={(e) => handelOnFocus(e)}
                  {...register('price', {
                    required: true,
                    onBlur: (e) => handleOnBlur(e),
                  })}
                />
              </LabelPrice>
              <LabelPrice htmlFor="specialPrice">
                할인 이전 가격(원)
                <Input
                  id="specialPrice"
                  type="text"
                  onFocus={(e) => handelOnFocus(e)}
                  {...register('beforeDiscount', {
                    onBlur: (e) => handleOnBlur(e),
                  })}
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
              {isPriceErr ? (
                <TextError>할인 이전 가격은 판매가보다 높아야합니다.</TextError>
              ) : null}
            </InnerContainer>
            <TitleForm>
              카테고리
              <IconQuestion />
            </TitleForm>
            <InnerContainer>
              <Select
                value={selectCategory}
                {...register('firstCategory', {
                  onChange: (e) => setSelectCategory(e.target.value),
                })}
              >
                <option disabled value={-1}>
                  1차 분류
                </option>
                {CATEGORY.map((ele) => (
                  <option value={ele.order} key={`category-first-${uuidv4()}`}>
                    {ele.title}
                  </option>
                ))}
              </Select>
              <Select defaultValue="none" {...register('secondCategory')}>
                <option disabled value="none">
                  2차 분류
                </option>
                {selectCategory > -1
                  ? CATEGORY[selectCategory].subCategory.map((ele) => (
                      <option
                        value={ele.value}
                        key={`category-second-${uuidv4()}`}
                      >
                        {ele.title}
                      </option>
                    ))
                  : null}
              </Select>
            </InnerContainer>
            <TitleForm>
              상품 이미지
              <IconQuestion />
              <Tooltips>
                상품 상세 페이지의 최상단에 보여지는 이미지입니다.
                <br />첫 번째 이미지는 대표 이미지로 상품 목록에서 썸네일로
                보여지는 이미지로 등록욉니다.
              </Tooltips>
            </TitleForm>
            <InnerContainer>
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
            </InnerContainer>
            <TitleForm>상품 상세 설명</TitleForm>
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
              <Tooltips>베송비 적용 여부를 선택하세요.</Tooltips>
            </TitleForm>
            <InnerContainer>
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
                배송비 적용
              </LabelRadio>
              <TextDescription>
                - 일반 배송비는 2,500원, 도서산간지방 (제주, 울릉도)은
                10,000원이 적용됩니다.
                <br />- 총 상품 주문 금액이 50,000원을 넘어서는 경우 무료 배송이
                적용됩니다.
              </TextDescription>
            </InnerContainer>
            <TitleForm>
              검색 엔진 최적화
              <IconQuestion />
              <Tooltips>
                검색 포털 사이트에 내 상품이 더 잘 노출될 수 있도록 상품별로
                제목과 메타 설명을 작성해주세요.
                <br />
                미입력 시 상품 제목과 상품 상세 텍스트가 적용됩니다.
              </Tooltips>
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
  position: relative;
  padding-top: 4px;
  font-size: 15px;
  font-weight: 600;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  &:nth-of-type(1) {
    flex-direction: column;
  }
`;

const IconQuestion = styled(QuestionIcon)`
  width: 12px;
  height: 12px;
  position: relative;
  margin: 1px 0 0 5px;
  vertical-align: top;

  &:hover + span {
    visibility: visible;
    opacity: 1;
  }
`;

const Tooltips = styled.span`
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  padding: 10px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background.transparency};
  color: ${({ theme }) => theme.background.default};
  font-size: 13px;
  font-weight: 400;
  line-height: 1.3;
  transform: translateY(-130%);
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 10px;
    border: 6px solid;
    border-color: ${({ theme }) => theme.background.transparency} transparent
      transparent transparent;
  }
`;

const TextDescription = styled.p`
  width: 100%;
  margin-top: 10px;
  color: ${({ theme }) => theme.text.primary};
  font-size: 13px;
  line-height: 1.3;
`;

// 공통 스타일
const LableStyle = () => css`
  display: flex;
  flex-direction: column;

  & input,
  & textarea,
  & select {
    margin-top: 10px;
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

const LabelRadio = styled.label`
  & + & {
    margin-left: 10px;
  }
`;

const InputRadio = styled.input`
  margin-right: 5px;
`;

const LabelPrice = styled.label`
  ${LableStyle}

  & + & {
    margin-left: 10px;
  }
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
  width: 100%;
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
  width: 100%;
  line-height: 30px;
  padding: ${pxToRem(10)} 0;
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

const TextError = styled.p`
  width: 100%;
  margin-top: ${pxToRem(10)};
  color: ${({ theme }) => theme.input.error};
  font-size: ${pxToRem(14)};
  line-height: 1.4;

  &::before {
    content: '';
    display: inline-block;
    min-width: ${pxToRem(14)};
    height: ${pxToRem(14)};
    margin: 0 ${pxToRem(5)} ${pxToRem(-2)} 0;
    background: url('/icons/emoji-frown.svg') no-repeat;
    background-size: 100%;
  }
`;
