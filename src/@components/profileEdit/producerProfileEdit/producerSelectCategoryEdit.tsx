import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { CategoryId } from "../../../core/common/categories";
import { useGetProducerProfile } from "../../../hooks/queries/mypage";
import { CategoryIdType } from "../../../type/common/category";
import { getInvariantObjectKeys, invariantOf } from "../../../utils/common/invarientType";
import { CheckBox } from "../../@common/checkBox";
import InputContainer from "../../@common/inputContainer";

interface ProducerSelectCategoryEditProps {
  selectCategory: (option: CategoryIdType) => void;
}

export default function ProducerSelectCategoryEdit(props: ProducerSelectCategoryEditProps) {
  const { selectCategory } = props;
  const { id } = useParams();
  const prevValues = useGetProducerProfile(Number(id)).producerProfile?.userProfile.userCategory;

  useEffect(() => {
    prevValues?.forEach((category) => selectCategory(CategoryId[category]));
  }, []);

  return (
    <CategoryContainer>
      <InputContainer title="Category">
        <CategoryBox>
          {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
            return (
              <CheckBox
                key={CategoryId[category]}
                id={CategoryId[category]}
                externalFn={() => selectCategory(CategoryId[category])}
                defaultChecked={prevValues?.includes(category)}>
                <CheckBox.Indicator asChild>
                  <CategoryItem>{category}</CategoryItem>
                </CheckBox.Indicator>
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

const CategoryItem = styled.li<{ isChecked?: boolean }>`
  width: 25%;

  margin-bottom: 1.2rem;

  color: ${({ theme, isChecked }) => (isChecked ? theme.colors.white : theme.colors.gray4)};
`;
