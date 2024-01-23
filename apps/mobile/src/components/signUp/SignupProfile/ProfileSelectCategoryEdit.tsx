import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useFormContextWithRef } from 'track-1-form-with-react-hook-form';
import { CategoryCheckIc, DropdownIc, DropupIc } from '../../../assets';
import { CategoryId, UpperCategories } from '../../../core/common/categories';
import useModals from '../../../hooks/common/useModals';
import { getInvariantObjectKeys, invariantOf } from '../../../utils/common/invarientType';
import { InputTitle } from '../../common/Form/inputForm';
import { CheckBox } from '../../common/checkBox';
import { Z_INDEX } from '../../../core/common/zIndex';

export default function ProfileSelectCategoryEdit() {
  const { registerWithRef, ...methods } = useFormContextWithRef();

  const {
    getValues,
    watch,
    formState: { defaultValues },
  } = methods;

  function showCateg() {
    let category: (string | undefined)[] = [];
    watch('category').map((categIdx: number) => category.push(`${UpperCategories[categIdx]}`));

    return category;
  }

  const [isOpen, setIsOpen] = useState(false);
  const { modalRef, handleShowUpdateModal } = useModals({ isOpen, setIsOpen });

  const categoryInputRef = useRef<HTMLDivElement>(null);

  function handleMoveScrollHeight() {
    categoryInputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  useEffect(() => {
    if (isOpen) {
      handleMoveScrollHeight();
    } else {
      window.scroll(0, 0);
    }
  }, [isOpen]);

  return (
    <ProfileSelectCategoryEditWrapper ref={categoryInputRef}>
      <InputTitle>Category</InputTitle>
      <div>
        <Styled.InputWrapper isSelected={showCateg().toString() !== ''} onClick={handleShowUpdateModal}>
          <Styled.Category>{showCateg().toString() || 'Select your music category'}</Styled.Category>
          {isOpen ? <Styled.DropupIcon /> : <Styled.DropdownIcon />}
        </Styled.InputWrapper>
        {isOpen && (
          <Styled.CategoryBoxWrapper ref={modalRef}>
            <Styled.CategoryBox>
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

              <Select onClick={handleShowUpdateModal}>Select</Select>
            </Styled.CategoryBox>
          </Styled.CategoryBoxWrapper>
        )}
      </div>
    </ProfileSelectCategoryEditWrapper>
  );
}

const ProfileSelectCategoryEditWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const CategoryCheckIcon = styled(CategoryCheckIc)`
  width: 1.5rem;
`;

const Select = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  text-decoration-line: underline;
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.Pre_16_R}
`;

const CategoryItem = styled.input<{ isChecked?: boolean }>`
  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray2)};
`;

const CategoryLabel = styled.label<{ isSelected?: boolean }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray2)};
`;

const Styled = {
  CategoryBox: styled.div`
    position: absolute;

    display: flex;
    flex-direction: column;

    align-items: center;
    gap: 2rem;

    width: 100%;
    height: 45.6rem;

    ${({ theme }) => theme.fonts.Pre_16_R};

    margin-top: 1rem;
    padding: 3rem;

    border-radius: 1rem;
    border: 1px solid rgb(49, 51, 56);
    background: rgba(27, 28, 32, 0.5);
    backdrop-filter: blur(15px);
  `,
  Box: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `,
  Category: styled.p`
    display: flex;
    align-content: center;
    flex-wrap: wrap;
  `,
  InputWrapper: styled.div<{ isSelected: boolean }>`
    display: flex;
    width: 100%;
    justify-content: space-between;

    ${({ theme }) => theme.fonts.Pre_16_R};
    color: ${({ theme, isSelected }) => (isSelected ? theme.colors.white : theme.colors.gray3)};

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
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
  CategoryBoxWrapper: styled.div`
    position: relative;
    z-index: ${Z_INDEX.CATEGORY_DROPDOWN};
    width: 100%;
  `,
};
