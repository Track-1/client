import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { TrackSearchingFalseIc, TrackSearchingTrueIc } from "../../assets";
import { CategoryId } from "../../core/common/categories";
import { UpperCategoryType } from "../../type/common/category";
import { PageType } from "../../type/common/pageType";
import { getInvariantObjectKeys, invariantOf } from "../../utils/common/invarientType";
import { updateQueryParams } from "../../utils/common/queryString";
import { CheckBox } from "./checkBox";

const FilterWrapper = styled.section`
  position: fixed;
  left: 0;
  top: 17rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CategoryItem = styled.div<{ pageType: PageType; isChecked?: boolean }>`
  ${({ theme }) => theme.fonts.id}
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 30.9rem;
  height: 5rem;

  padding-left: 6.396rem;
  margin-bottom: 1.9rem;
  margin-left: 1.2rem;

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

    & > button {
    ${({ pageType, isChecked }) =>
      pageType === "tracks" &&
      (isChecked
        ? css`
            color: ${({ theme }) => theme.colors.sub1};
          `
        : css`
            color: ${({ theme }) => theme.colors.sub1};
            display: none;
          `)}

    ${({ pageType, isChecked }) =>
      pageType === "vocals" &&
      (isChecked
        ? css`
            color: ${({ theme }) => theme.colors.sub2};
          `
        : css`
            color: ${({ theme }) => theme.colors.sub2};
            display: none;
          `)}
  }
`;

const CategoryCancelButton = styled.button`
  margin-right: 2rem;
`;

const TrackSearchingItem = styled.article<{ isChecked?: boolean }>`
  ${({ theme }) => theme.fonts.body1}
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 1.2rem;

  height: 7.5rem;
  margin-left: 1.2rem;
  padding-left: 6.396rem;

  color: ${({ theme }) => theme.colors.white};
`;

const TrackSearchingLabel = styled.p<{ isChecked?: boolean }>`
  ${({ isChecked }) =>
    isChecked &&
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(new Set());
  const [trackSearch, setTrackSearch] = useState(false);

  function selectCategory(category: UpperCategoryType) {
    const tempSelectedCategory = new Set(selectedCategory);
    const categoryId = CategoryId[category];

    tempSelectedCategory.has(categoryId)
      ? tempSelectedCategory.delete(categoryId)
      : tempSelectedCategory.add(categoryId);

    setSelectedCategory(tempSelectedCategory);
  }

  function toggleTrackSearching() {
    trackSearch ? setTrackSearch(false) : setTrackSearch(true);
  }

  useEffect(() => {
    const categString = updateQueryParams("categ", Array.from(selectedCategory));

    navigate(categString);
  }, [selectedCategory]);

  useEffect(() => {
    trackSearch && searchParams.set("trackSearch", String(trackSearch));
    setSearchParams(searchParams);
    navigate("?" + searchParams.toString());
  }, [trackSearch]);

  return (
    <FilterWrapper>
      {getInvariantObjectKeys(invariantOf(CategoryId)).map((category) => {
        return (
          <CheckBox id={category} externalFn={() => selectCategory(category)}>
            <CheckBox.Indicator asChild>
              <CategoryItem pageType={pageType}>
                <CheckBox.Label>{category}</CheckBox.Label>
                <CategoryCancelButton>X</CategoryCancelButton>
              </CategoryItem>
            </CheckBox.Indicator>
          </CheckBox>
        );
      })}
      {pageType === "vocals" && (
        <CheckBox externalFn={toggleTrackSearching}>
          <CheckBox.Indicator asChild>
            <TrackSearchingItem>
              {trackSearch ? <TrackSearchingTrueIc /> : <TrackSearchingFalseIc />}
              <CheckBox.Label asChild>
                <TrackSearchingLabel>Track Searching</TrackSearchingLabel>
              </CheckBox.Label>
            </TrackSearchingItem>
          </CheckBox.Indicator>
        </CheckBox>
      )}
    </FilterWrapper>
  );
}
