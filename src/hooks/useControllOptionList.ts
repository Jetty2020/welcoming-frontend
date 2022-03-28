import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';
import { RegisterFormProps } from 'src/types';

export const useControllOptionList = (
  getValues: UseFormGetValues<RegisterFormProps>,
  setValue: UseFormSetValue<RegisterFormProps>,
) => {
  const [optionList, setOptionList] = useState<Array<string>>([]);

  const addOptionItem = () => {
    const updatedOptionList = [...optionList];
    updatedOptionList.push(getValues().optionValue1);
    setOptionList(updatedOptionList);
    setValue('optionValue1', '');
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter' && getValues().optionValue1 !== '') {
      addOptionItem();
    }
  };

  const deleteProductOption = (idx: number) => {
    setOptionList((state) => state.filter((_, i) => i !== idx));
  };

  return { pressEnter, deleteProductOption, optionList };
};
