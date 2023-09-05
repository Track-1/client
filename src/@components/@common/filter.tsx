import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { CategoryId } from "../../core/common/categories";
import { PageType } from "../../type/common/pageType";
import { getInvariantObjectKeys, invariantOf } from "../../utils/common/invarientType";
import { updateQueryParams } from "../../utils/common/queryString";
import { Select } from "./selectBox";

const CategoryItem = styled.div<{ pageType: PageType; isSelected?: boolean }>`
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

  ${({ pageType, isSelected }) =>
    pageType === "tracks" &&
    isSelected &&
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

  ${({ pageType }) =>
    pageType === "vocals" &&
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

const CategoryCancelButton = styled.button<{ pageType: PageType; isSelected?: boolean }>`
  margin-right: 2rem;

  ${({ pageType, isSelected }) =>
    pageType === "tracks" &&
    isSelected &&
    css`
      color: ${({ theme }) => theme.colors.sub1};
    `}

  ${({ pageType, isSelected }) =>
    pageType === "vocals" &&
    isSelected &&
    css`
      color: ${({ theme }) => theme.colors.sub2};
    `}
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
    <Select defaultOpen externalSelectState={selectCategory}>
      <Select.OptionGroup asChild={false}>
        {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
          return (
            <Select.Option key={CategoryId[category]} id={Number(CategoryId[category])} isUnSelectable asChild>
              <CategoryItem pageType={pageType}>
                {category}
                <Select.Indicator id={Number(CategoryId[category])} asChild>
                  <CategoryCancelButton pageType={pageType}>x</CategoryCancelButton>
                </Select.Indicator>
              </CategoryItem>
            </Select.Option>
          );
        })}
      </Select.OptionGroup>
    </Select>
  );
}
