import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { CategoryId } from "../../core/common/categories";
import { ProfileInfoInputType } from "../../type/profile";
import { getInvariantObjectKeys, invariantOf } from "../../utils/common/invarientType";
import { CheckBox } from "../@common/checkBox";
import InputContainer from "../@common/inputContainer";

export default function ProfileSelectCategoryEdit() {
  const {
    register,
    formState: { defaultValues },
  } = useFormContext<ProfileInfoInputType, any, undefined>();

  return (
    <CategoryContainer>
      <InputContainer title="Category">
        <CategoryBox>
          {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
            return (
              <CheckBox
                key={CategoryId[category]}
                id={CategoryId[category]}
                defaultChecked={defaultValues?.category?.includes(CategoryId[category])}>
                <CheckBox.Label asChild>
                  <CategoryLabel>
                    <CheckBox.Indicator asChild>
                      <CategoryItem {...register("category")} value={CategoryId[category]} />
                    </CheckBox.Indicator>
                    {category}
                  </CategoryLabel>
                </CheckBox.Label>
              </CheckBox>
            );
          })}
        </CategoryBox>
      </InputContainer>
    </CategoryContainer>
  );
}

const CategoryContainer = styled.div`
  margin-bottom: 6.2rem;
`;

const CategoryBox = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  margin-top: 2.2rem;

  ${({ theme }) => theme.fonts.hashtag}
  color: ${({ theme }) => theme.colors.gray4};
  align-items: center;

  cursor: pointer;
`;

const CategoryItem = styled.input<{ isChecked?: boolean }>`
  width: 25%;

  margin-bottom: 1.2rem;

  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray4)};
`;

const CategoryLabel = styled.label<{ isChecked?: boolean }>`
  width: 25%;

  margin-bottom: 1.2rem;

  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray4)};
`;
