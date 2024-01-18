import { useSearchParams } from 'react-router-dom';
import { useFilteredTracks } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import TrackSearchItem from './trackSearchItem';
import { FilteredTrackType } from '../../type/tracks';
import { useState } from 'react';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import styled from 'styled-components';
import { FilterIc } from '../../assets';
import { ImageWrapper, InfinityObserver } from '../common/Interface';
import { StyledDivisionLine } from '../common/DivisionLine';
import FilterModal from '../common/Modal/Filter';
import { useFilter } from '../../hooks/common/useFilter';
import { PageType } from '../../type/common/pageType';
import { Categories, LowerCategoryId } from '../../core/common/categories';

export default function TrackSearchContainer() {
  const [searchParams] = useSearchParams();

  const { trackData, fetchNextPage, hasNextPage } = useFilteredTracks({
    limit: 10,
    categ: searchParams.getAll('categ'),
  });

  const [openModal, setOpenModal] = useState(false);

  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);

  const [playingTrack, setPLayingTrack] = useState<FilteredTrackType['trackId'] | null>(null);

  const { selectedCategory, selectCategory, removeCategory, handleSelectCategory, resetCategory } = useFilter();

  function selectTrack(trackId: FilteredTrackType['trackId']) {
    setPLayingTrack(trackId);
  }

  function showModal() {
    setOpenModal(true);
  }

  function unShowModal() {
    setOpenModal(false);
  }

  if (trackData === undefined) return null;

  return (
    <>
      <Text as="h1" font="Alex_25_R" color="white" margin="2rem 0 3.1rem" lineHeight="130%">
        {'New Tracks for\n Limitless Chance'}
      </Text>

      <SectionContainer>
        <TrackListHeader>
          <TracksTextWrapper>
            <Text as="p" font="Pre_14_M" color="gray4">
              Tracks
            </Text>
          </TracksTextWrapper>
          <TrackListHeaderWrapper>
            <Text as="p" font="Pre_14_M" color="gray4">
              Category
            </Text>
            <ImageWrapper width={3} height={3}>
              <FilterIc onClick={showModal} />
              <FilterModal
                openModal={openModal}
                showModal={showModal}
                unShowModal={unShowModal}
                pageType="tracks"
                selectCategory={selectCategory}
                selectedCategory={selectedCategory}
                handleSelectCategory={handleSelectCategory}
                resetCategory={resetCategory}
              />
            </ImageWrapper>
          </TrackListHeaderWrapper>
        </TrackListHeader>
        <StyledDivisionLine />
        {/* 이거 너무 쓰레기 코드다...... 리팩토링 1순위 */}
        {selectedCategory.size > 0 && (
          <SelectedCategoryWrapper>
            {Categories.map(
              (category) =>
                selectedCategory.has(LowerCategoryId[category]) && (
                  <SelectedCategoryItem
                    pageType="tracks"
                    onClick={() => removeCategory(category)}>{`${category} X`}</SelectedCategoryItem>
                )
            )}
          </SelectedCategoryWrapper>
        )}
        <ul>
          {trackData?.map((trackInfo) => (
            <li key={trackInfo.trackId}>
              <TrackSearchItem
                trackInfo={trackInfo}
                isSelected={trackInfo.trackId === playingTrack}
                playingTrack={playingTrack}
                selectTrack={selectTrack}
              />
              <StyledDivisionLine />
            </li>
          ))}
        </ul>
      </SectionContainer>
      <InfinityObserver ref={observerRef} />
    </>
  );
}

const SectionContainer = styled.section`
  margin-bottom: 6rem;
`;

const TrackListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 4.9rem;
`;

const TracksTextWrapper = styled.div`
  width: calc(100% - 11.8rem);
`;

const TrackListHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 11.8rem;
  height: 100%;
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
