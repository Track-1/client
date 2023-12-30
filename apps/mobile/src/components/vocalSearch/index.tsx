import styled from 'styled-components';
import Text from '../common/Text';
import { ImageWrapper } from '../common/Interface';
import { FilterIc } from '../../assets';
import FilterModal from '../common/Modal/Filter';
import { useState } from 'react';
import { useFilter } from '../../hooks/common/useFilter';
import { StyledLined } from '../common/DivisionLine';
import { PADDING_SIDE } from '../layout';
import { Categories, LowerCategoryId } from '../../core/common/categories';
import { PageType } from '../../type/common/pageType';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import { useFilteredVocals } from '../../hooks/queries/vocals';
import { useSearchParams } from 'react-router-dom';
import VocalSearchItem from './vocalSearchItem';
import { FilteredVocalType } from '../../type/vocals';

export default function VocalSearchContainer() {
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState(false);

  const [playingTrack, setPlayingTrack] = useState<FilteredVocalType['userId'] | null>(null);

  const { selectedCategory, selectCategory, removeCategory, handleSelectCategory, resetCategory } = useFilter();

  const { vocalData, fetchNextPage, hasNextPage } = useFilteredVocals({
    limit: 10,
    categ: searchParams.getAll('categ'),
    trackSearch: Boolean(searchParams.get('trackSearch')),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  function showModal() {
    setOpenModal(true);
  }

  function unShowModal() {
    setOpenModal(false);
  }

  function selectTrack(userId: FilteredVocalType['userId']) {
    setPlayingTrack(userId);
  }

  return (
    <>
      <Text as="h1" font="Alex_25_R" color="white" margin="2rem 0 3.1rem" lineHeight="130%">
        {'New Vocals for\n Limitless Inspiration'}
      </Text>

      <section>
        <VocalListHeader>
          <Text as="p" font="Pre_14_M" color="gray4">
            Vocals
          </Text>
          <ImageWrapper width={3} height={3}>
            <FilterIc onClick={showModal} />
            <FilterModal
              openModal={openModal}
              showModal={showModal}
              unShowModal={unShowModal}
              pageType="vocals"
              selectCategory={selectCategory}
              selectedCategory={selectedCategory}
              handleSelectCategory={handleSelectCategory}
              resetCategory={resetCategory}
            />
          </ImageWrapper>
        </VocalListHeader>
        <DivisionLine />
        {/* 이거 너무 쓰레기 코드다...... 리팩토링 1순위 */}
        {selectedCategory.size > 0 && (
          <SelectedCategoryWrapper>
            {Categories.map(
              (category) =>
                selectedCategory.has(LowerCategoryId[category]) && (
                  <SelectedCategoryItem
                    pageType="vocals"
                    onClick={() => removeCategory(category)}>{`${category} X`}</SelectedCategoryItem>
                )
            )}
          </SelectedCategoryWrapper>
        )}
        <VocalListWrapper>
          {vocalData?.map((trackInfo) => (
            <VocalSearchItem trackInfo={trackInfo} playingTrack={playingTrack} selectTrack={selectTrack} />
          ))}
        </VocalListWrapper>
      </section>
    </>
  );
}

const VocalListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 4.9rem;
`;

const DivisionLine = styled(StyledLined)`
  width: calc(${`100% + ${PADDING_SIDE}*2`});

  margin-left: ${`-${PADDING_SIDE}`};
`;

const SelectedCategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.3rem;

  width: 100%;
  padding: 2rem 0;
`;

const SelectedCategoryItem = styled.div<{ pageType: PageType }>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.Pre_13_R};
  color: ${({ theme, pageType }) => (pageType === 'tracks' ? theme.colors.neon_green : theme.colors.neon_pink)};

  border-radius: 2rem;
  border: 1px solid
    ${({ theme, pageType }) => (pageType === 'tracks' ? theme.colors.neon_green : theme.colors.neon_pink)};

  padding: 0.6rem 1.2rem 0.7rem;
`;

const VocalListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 4rem 0;

  width: 100%;

  margin-top: 2.5rem;
`;
