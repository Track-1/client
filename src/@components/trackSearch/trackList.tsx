import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import {
  TitleTextIc,
  ProducerCategoryTextIc,
  CategoryTextIc,
  HashtagTextIc,
  HoverPauseIc,
  HoverPlayIc,
} from "../../assets";
import { showPlayerBar, playMusic } from "../../recoil/player";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { TracksDataType } from "../../type/tracksDataType";
import { trackListinfiniteScroll } from "../../recoil/infiniteScroll";
import usePlay from "../../utils/hooks/usePlay";

interface PropsType {
  audio: HTMLAudioElement;
  playAudio: () => void;
  pauseAudio: () => void;
  tracksData: TracksDataType[];
  getAudioInfos: (title: string, name: string, image: string, duration: number) => void;
}

export default function TrackList(props: PropsType) {
  const { audio, pauseAudio, tracksData, getAudioInfos } = props;

  const target = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [page, setPage] = useRecoilState(trackListinfiniteScroll);

  const { clickedIndex, playAudio } = usePlay(audio, tracksData);

  useEffect(() => {
    const observer = new IntersectionObserver((endDiv) => {
      if (endDiv[0].isIntersecting) {
        loadMore();
      }
    });
    observer.observe(target.current!);
  }, []);

  useEffect(() => {
    getAudioInfos(
      tracksData[clickedIndex]?.title,
      tracksData[clickedIndex]?.producerName,
      tracksData[clickedIndex]?.jacketImage,
      tracksData[clickedIndex]?.wavFileLength,
    );
  });

  function loadMore() {
    setPage((prev) => prev + 1);
  }

  function mouseOverTrack(id: number) {
    setHoveredIndex(id);
  }

  function mouseOutTrack() {
    setHoveredIndex(-1);
  }

  function movePostPage(id: number) {
    pauseAudio();

    setPlay(false);

    navigate(`/track-post/${id}`, { state: id });
    setShowPlayer(false);
  }

  function moveProducerProfilePage(producerId: number) {
    navigate(`/producer-profile/${producerId}`, { state: producerId });
    setShowPlayer(false);
  }

  return (
    <TrackListContainer>
      <CategoryWrapper>
        <TitleTextIcon />
        <ProducerCategoryTextIcon />
        <CategoryTextIcon />
        <HashtagTextIcon />
      </CategoryWrapper>

      <TracksWrapper>
        {tracksData.map((track, index) => (
          <Tracks
            key={track.beatId}
            onMouseEnter={() => mouseOverTrack(index)}
            onMouseLeave={mouseOutTrack}
            showPlayer={showPlayer}
            trackHoverBool={hoveredIndex === index}
            trackClickBool={clickedIndex === index}
            trackClick={clickedIndex}>
            <TrackBox>
              {((clickedIndex !== index && hoveredIndex === index && hoveredIndex !== -1) ||
                (!play && clickedIndex === index && clickedIndex !== -1)) && (
                <HoverPauseIcon onClick={() => playAudio(index)} />
              )}
              {play && clickedIndex === index && clickedIndex !== -1 && <HoverPlayIcon onClick={pauseAudio} />}
              <Thumbnail src={track.jacketImage} alt="썸네일" />
              <TrackText width={36.8} isHover={true} onClick={() => movePostPage(track.beatId)}>
                {track.title}
              </TrackText>
              <TrackText width={21.3} isHover={true} onClick={() => moveProducerProfilePage(track.producerId)}>
                {track.producerName}
              </TrackText>
              <TrackText width={20.5} isHover={false}>
                {track.category}
              </TrackText>
            </TrackBox>
            {track.keyword.map((tag, idx) => (
              <Tag key={idx}>#{tag}</Tag>
            ))}
          </Tracks>
        ))}
      </TracksWrapper>
      <InfiniteDiv ref={target}> 아아 </InfiniteDiv>
    </TrackListContainer>
  );
}

const TrackListContainer = styled.section``;

const HoverPauseIcon = styled(HoverPauseIc)`
  position: absolute;
  z-index: 2;

  cursor: pointer;
`;
const HoverPlayIcon = styled(HoverPlayIc)`
  position: absolute;
  z-index: 2;

  cursor: pointer;
`;

const CategoryWrapper = styled.section`
  margin: 4.6rem 0 3.5rem 9rem;
`;
const TitleTextIcon = styled(TitleTextIc)``;

const ProducerCategoryTextIcon = styled(ProducerCategoryTextIc)`
  margin-left: 43rem;
`;

const CategoryTextIcon = styled(CategoryTextIc)`
  margin-left: 10.7rem;
`;

const HashtagTextIcon = styled(HashtagTextIc)`
  margin-left: 10.7rem;
`;

const TracksWrapper = styled.section`
  ${({ theme }) => theme.fonts.body1}
  color: ${({ theme }) => theme.colors.white};
`;

const Tracks = styled.article<{
  showPlayer: boolean;
  trackHoverBool: boolean;
  trackClickBool: boolean;
  trackClick: number;
}>`
  display: flex;
  align-items: center;

  width: 154.3rem;
  height: 12.1rem;

  margin-left: 6.6rem;
  margin-bottom: 0.7rem;

  border: 0.15rem solid transparent;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to right,
      ${({ trackHoverBool, trackClickBool, trackClick, theme }) =>
          (trackHoverBool || (trackClickBool && trackClick !== -1)) && theme.colors.sub1}
        0%,
      ${({ theme }) => theme.colors.sub3} 95%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 11.7rem 0 0 11.7rem;
`;

const TrackBox = styled.div`
  display: flex;
  align-items: center;

  margin-left: 2.4rem;
`;

const Thumbnail = styled.img`
  width: 8.3rem;
  height: 8.3rem;

  margin-right: 2.8rem;

  border-radius: 6.55rem;
`;

const TrackText = styled.div<{ width: number; isHover: boolean }>`
  width: ${(props) => props.width}rem;
  ${({ theme }) => theme.fonts.body1};
  :hover {
    color: ${({ isHover, theme }) => isHover && theme.colors.sub1};
    cursor: pointer;
  }
`;

const Tag = styled.span`
  display: flex;
  align-items: center;

  height: 3.8rem;

  padding: 0.9rem 1.5rem;
  margin: 0 0.8rem 0 0;

  ${({ theme }) => theme.fonts.body1};
  background: ${({ theme }) => theme.colors.gray4};
  border-radius: 21px;
`;

const InfiniteDiv = styled.div`
  width: 100%;
  height: 1rem;
`;
