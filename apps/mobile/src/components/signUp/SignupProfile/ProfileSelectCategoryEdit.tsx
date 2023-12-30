import styled from 'styled-components';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { CategoryCheckIc, DropdownIc, DropupIc } from '../../../assets';
import { CategoryId, UpperCategories } from '../../../core/common/categories';
import useModalState from '../../../hooks/common/useModalState';
import { getInvariantObjectKeys, invariantOf } from '../../../utils/common/invarientType';
import { InputTitle } from '../../common/Form/inputForm';
import Category from '../../common/Modal/Category';
import { CheckBox } from '../../common/checkBox';

export default function ProfileSelectCategoryEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();
  const { isOpen, onClose, onOpen } = useModalState();

  const {
    getValues,
    formState: { defaultValues },
  } = methods;

  function showCateg() {
    let category: (string | undefined)[] = [];
    getValues('category').map((categIdx: number) => category.push(`${UpperCategories[categIdx]}`));

    return category;
  }

  return (
    <>
      <InputTitle>Category</InputTitle>
      <Styled.InputWrapper>
        <Styled.Input type="text" placeholder="Select your music category" defaultValue={showCateg().toString()} />
        {isOpen ? <Styled.DropupIcon onClick={onClose} /> : <Styled.DropdownIcon onClick={onOpen} />}
      </Styled.InputWrapper>
      <Category isOpen={isOpen} onClose={onClose}>
        <CategoryBox>
          {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
            return (
              <CheckBox
                key={CategoryId[category]}
                id={CategoryId[category]}
                defaultChecked={defaultValues?.category?.includes(CategoryId[category])}>
                <CheckBox.Label asChild>
                  <CategoryLabel isSelected={showCateg().includes(category)}>
                    {category}
                    <CheckBox.Indicator asChild>
                      <CategoryItem {...registerWithRef('category', {})} value={CategoryId[category]} />
                    </CheckBox.Indicator>
                    {showCateg().includes(category) && <CategoryCheckIcon />}
                  </CategoryLabel>
                </CheckBox.Label>
              </CheckBox>
            );
          })}
        </CategoryBox>
        <Select onClick={onClose}>Select</Select>
      </Category>
    </>
  );
}

const CategoryCheckIcon = styled(CategoryCheckIc)`
  width: 1.5rem;
`;

const Select = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  padding-bottom: 2rem;
  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.Pre_16_R}
`;

const CategoryBox = styled.ul`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  min-width: 30rem;
  max-height: 37rem;
  justify-content: space-between;

  ${({ theme }) => theme.fonts.Pre_16_R}
  color: ${({ theme }) => theme.colors.gray2};
  align-items: center;

  cursor: pointer;
  overflow-y: scroll;
`;

const CategoryItem = styled.input<{ isChecked?: boolean }>`
  margin-bottom: 1.2rem;

  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray2)};
`;

const CategoryLabel = styled.label<{ isSelected?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;

  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray2)};
`;

const Styled = {
  Box: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  InputWrapper: styled.div`
    display: flex;
  `,
  DropupIcon: styled(DropupIc)`
    width: 3rem;
    height: 3rem;
    margin-left: -3rem;
  `,
  DropdownIcon: styled(DropdownIc)`
    width: 3rem;
    height: 3rem;
    margin-left: -3rem;
  `,
  Input: styled.input`
    width: 100%;
    height: 100%;

    padding: 1rem 0;

    ${({ theme }) => theme.fonts.Pre_16_R};
    color: ${({ theme }) => theme.colors.white};

    ::placeholder {
      color: ${({ theme }) => theme.colors.gray3};
    }
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
  `,
  CategoryBox: styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    gap: 2rem;
    ${({ theme }) => theme.fonts.Pre_16_R};
    color: ${({ theme }) => theme.colors.gray2};
    align-items: center;

    cursor: pointer;
  `,
};
