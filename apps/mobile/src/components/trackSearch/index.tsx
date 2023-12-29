import { useSearchParams } from 'react-router-dom';
import { useFilteredTracks } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import TrackSearchItem from './trackSearchItem';
import PlayTrackForm from '../common/Form/playTrackForm';
import { FilteredTrackType } from '../../type/tracks';
import { useState } from 'react';
import useInfiniteScroll from '../../hooks/common/useInfiniteScroll';
import styled from 'styled-components';
import { FilterIc } from '../../assets';
import { ImageWrapper } from '../common/Interface';
import { StyledLined } from '../common/DivisionLine';
import { PADDING_SIDE } from '../layout';
import FilterModal from '../common/Modal/Filter';
import { useFilter } from '../../hooks/common/useFilter';
import { PageType } from '../../type/common/pageType';
import { Categories, LowerCategoryId } from '../../core/common/categories';
import { CategoryType } from '../../type/common/category';

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

      <section>
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
        <DivisionLine />
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
            <>
              <TrackSearchItem
                trackTitle={trackInfo.trackTitle}
                trackUserName={trackInfo.trackUserName}
                trackCategory={trackInfo.trackCategory}
                isSelected={trackInfo.trackId === playingTrack}>
                <PlayTrackForm
                  trackInfo={trackInfo}
                  playingTrack={playingTrack}
                  selectTrack={selectTrack}
                  width={4}
                  height={4}
                  shape="rectangle"
                  align="center"
                />
              </TrackSearchItem>
              <DivisionLine />
            </>
          ))}
        </ul>
      </section>
      <div ref={observerRef} style={{ width: '100%', height: '20px' }} />
    </>
  );
}

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
