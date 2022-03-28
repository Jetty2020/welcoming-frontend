import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useState } from 'react';
import { RegisterFormProps } from 'src/types';

export const useControllOptionList = (
  getValues: UseFormGetValues<RegisterFormProps>,
  setValue: UseFormSetValue<RegisterFormProps>,
) => {
  const [optionList, setOptionList] = useState<Array<string>>([]);

  const addOptionItem = (
    name: 'optionValue1' | 'optionValue2',
    value: string,
  ) => {
    const updatedOptionList = [...optionList];
    updatedOptionList.push(value);
    setOptionList(updatedOptionList);
    setValue(name, '');
  };

  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (
        e.currentTarget.value !== '' &&
        (e.currentTarget.name === 'optionValue1' ||
          e.currentTarget.name === 'optionValue2')
      ) {
        addOptionItem(e.currentTarget.name, e.currentTarget.value);
      }
    }
  };

  const deleteProductOption = (idx: number) => {
    setOptionList((state) => state.filter((_, i) => i !== idx));
  };

  return { pressEnter, deleteProductOption, optionList };
};
