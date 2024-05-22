import styled, { css } from 'styled-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrackSearchingFalseIc, TrackSearchingTrueIc } from '../../assets';
import { EventCategoryId } from '../../core/common/categories';
import { EventUpperCategoryType } from '../../type/common/category';
import { PageType } from '../../type/common/pageType';
import { getInvariantObjectKeys, invariantOf } from '../../utils/common/invarientType';
import { CheckBox } from './checkBox';
import QueryString from 'qs';
import { useRouter } from '../../hooks/common/useRouter';
import { STATIC_ROUTES } from '../../core/common/routes';

interface FilterProps {
  pageType: PageType;
}

export default function Filter(props: FilterProps) {
  const { pageType } = props;
  const { categ } = QueryString.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  });
  const initialCateg = typeof categ === 'string' ? new Set([categ]) : new Set(categ as string[]);
  const [selectedCategory, setSelectedCategory] = useState<Set<string>>(initialCateg);
  const [trackSearch, setTrackSearch] = useState(false);
  const router = useRouter();

  function selectCategory(category: EventUpperCategoryType) {
    const tempSelectedCategory = new Set(selectedCategory);
    const categoryId = EventCategoryId[category];

    tempSelectedCategory.has(categoryId)
      ? tempSelectedCategory.delete(categoryId)
      : tempSelectedCategory.add(categoryId);

    setSelectedCategory(tempSelectedCategory);
  }

  function toggleTrackSearching() {
    trackSearch ? setTrackSearch(false) : setTrackSearch(true);
  }

  useEffect(() => {
    if (pageType === 'tracks') {
      router.push(STATIC_ROUTES.TRACK_SEARCH, { search: { categ: Array.from(selectedCategory) } });
    } else {
      router.push(STATIC_ROUTES.VOCAL_SEARCH, { search: { categ: Array.from(selectedCategory) } });
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (pageType === 'tracks') return;

    router.push(STATIC_ROUTES.VOCAL_SEARCH, { search: { trackSearch: trackSearch } });
  }, [trackSearch]);

  return (
    <FilterWrapper>
      {getInvariantObjectKeys(invariantOf(EventCategoryId)).map((category) => {
        return (
          <CheckBox
            id={category}
            externalFn={() => selectCategory(category)}
            key={category}
            defaultChecked={selectedCategory.has(EventCategoryId[category])}>
            <CheckBox.Indicator asChild>
              <CategoryItem pageType={pageType}>
                <CheckBox.Label>{category}</CheckBox.Label>
                <CategoryCancelButton>X</CategoryCancelButton>
              </CategoryItem>
            </CheckBox.Indicator>
          </CheckBox>
        );
      })}
      {pageType === 'vocals' && (
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
    pageType === 'tracks' &&
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
    pageType === 'vocals' &&
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
      pageType === 'tracks' &&
      (isChecked
        ? css`
            color: ${({ theme }) => theme.colors.sub1};
          `
        : css`
            color: ${({ theme }) => theme.colors.sub1};
            display: none;
          `)}

    ${({ pageType, isChecked }) =>
      pageType === 'vocals' &&
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
