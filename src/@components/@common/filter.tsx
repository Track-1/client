import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { CategoryId } from "../../core/common/categories";
import { PageType } from "../../type/common/pageType";
import { getInvariantObjectKeys, invariantOf } from "../../utils/common/invarientType";
import { updateQueryParams } from "../../utils/common/queryString";
import { CheckBox } from "./checkBox";
import { Select } from "./selectBox";

const CategoryItem = styled.div<{ pageType: PageType; isChecked?: boolean }>`
  ${({ theme }) => theme.fonts.id}
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;
  margin-left: 6.2rem;

  border: 0.15rem solid transparent;
  border-radius: 32px;

  color: ${({ theme }) => theme.colors.white};

  ${({ pageType, isChecked }) =>
    pageType === "tracks" &&
    isChecked &&
    css`
      background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
        linear-gradient(
          to right,
          ${({ theme }) => theme.colors.sub3} 0%,
          ${({ theme }) => theme.colors.sub3} 20%,
          ${({ theme }) => theme.colors.sub1} 100%
        );
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: ${({ theme }) => theme.colors.sub1};
    `}

  ${({ pageType, isChecked }) =>
    pageType === "vocals" &&
    isChecked &&
    css`
      background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
        linear-gradient(
          to right,
          ${({ theme }) => theme.colors.sub3} 0%,
          ${({ theme }) => theme.colors.sub3} 20%,
          ${({ theme }) => theme.colors.sub2} 100%
        );
      background-origin: border-box;
      background-clip: content-box, border-box;
      color: ${({ theme }) => theme.colors.sub2};
    `}
`;

const CategoryCancelButton = styled.button<{ pageType: PageType; isChecked?: boolean }>`
  margin-right: 2rem;

  ${({ pageType, isChecked }) =>
    pageType === "tracks" &&
    isChecked &&
    css`
      color: ${({ theme }) => theme.colors.sub1};
    `}

  ${({ pageType, isChecked }) =>
    pageType === "vocals" &&
    isChecked &&
    css`
      color: ${({ theme }) => theme.colors.sub2};
    `}
`;

const FilterWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

interface FilterProps {
  pageType: PageType;
}

export default function Filter(props: FilterProps) {
  const { pageType } = props;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());

  function selectCategory(id: number | null) {
    const tempSelectedCategory = new Set(selectedCategory);
    tempSelectedCategory.add(String(id));
    setSelectedCategory(tempSelectedCategory);
  }

  useEffect(() => {
    navigate(updateQueryParams("categ", Array.from(selectedCategory)));
  }, [selectedCategory]);

  return (
    <FilterWrapper>
      {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
        return (
          <CheckBox id={category}>
            <CheckBox.Indicator asChild>
              <CategoryItem pageType={pageType}>
                <CheckBox.Label>{category}</CheckBox.Label>
                <CheckBox.Indicator asChild>
                  <CategoryCancelButton pageType={pageType}>X</CategoryCancelButton>
                </CheckBox.Indicator>
              </CategoryItem>
            </CheckBox.Indicator>
          </CheckBox>
        );
      })}
    </FilterWrapper>
  );
}
