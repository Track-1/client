import { useEffect, useState } from "react";
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
import usePlay from "../../utils/hooks/usePlay";
import { isSameIndex } from "../../utils/common/checkIndex";

interface PropsType {
  audio: HTMLAudioElement;
  pauseAudio: () => void;
  tracksData: TracksDataType[];
  getInfos: any;
  excuteGetData: any;
}

export default function TrackList(props: PropsType) {
  const { audio, pauseAudio, tracksData, getInfos, excuteGetData } = props;

  const navigate = useNavigate();

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const [play, setPlay] = useRecoilState(playMusic);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);

  const { clickedIndex, playAudio, audioInfos } = usePlay(audio, tracksData, "tracks");

  useEffect(() => {
    getInfos(audioInfos);
  }, [clickedIndex]);

  function mouseOverTrack(id: number) {
    setHoveredIndex(id);
  }

  function mouseOutTrack() {
    setHoveredIndex(-1);
  }

  function movePostPage(id: number) {
    resetPlayer();
    navigate(`/track-post/${id}`, { state: id });
  }

  function resetPlayer() {
    pauseAudio();
    audio.currentTime = 0;
    setPlay(false);
    setShowPlayer(false);
  }

  function moveProducerProfilePage(producerId: number) {
    navigate(`/producer-profile/${producerId}`, { state: producerId });
    setShowPlayer(false);
    //여기--
    excuteGetData();
  }

  function isClickedTrack(index: number) {
    return isSameIndex(clickedIndex, index);
  }

  function isHoveredTrack(index: number) {
    return isSameIndex(hoveredIndex, index);
  }

  function isInitPlay(targetIndex: number) {
    return !isClickedTrack(targetIndex) && isHoveredTrack(targetIndex);
  }

  function isPlayAgain(targetIndex: number) {
    return isSameIndex(clickedIndex, targetIndex);
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
              {isInitPlay(index) && <HoverPauseIcon onClick={() => playAudio(index)} />}
              {isPlayAgain(index) &&
                (play ? <HoverPlayIcon onClick={pauseAudio} /> : <HoverPauseIcon onClick={() => playAudio(index)} />)}
              <ThumnailWrapper>
                <Thumbnail src={track.jacketImage} alt="썸네일" />
              </ThumnailWrapper>
              <TrackText width={36.8} isHoverActive={true} onClick={() => movePostPage(track.beatId)}>
                {track.title}
              </TrackText>
              <TrackText width={21.3} isHoverActive={true} onClick={() => moveProducerProfilePage(track.producerId)}>
                {track.producerName}
              </TrackText>
              <TrackText width={20.5} isHoverActive={false}>
                {track.category}
              </TrackText>
            </TrackBox>
            {track?.keyword?.map((tag, idx) => (
              <Tag key={idx}>#{tag}</Tag>
            ))}
          </Tracks>
        ))}
      </TracksWrapper>
    </TrackListContainer>
  );
}

const TrackListContainer = styled.section``;

const HoverPauseIcon = styled(HoverPauseIc)`
  width: 8.3rem;
  height: 8.3rem;
  position: absolute;
  z-index: 2;

  cursor: pointer;
`;
const HoverPlayIcon = styled(HoverPlayIc)`
  width: 8.3rem;
  height: 8.3rem;
  position: absolute;
  z-index: 2;

  cursor: pointer;
`;

const CategoryWrapper = styled.section`
  margin: 4.6rem 0 3.5rem 9rem;
`;
const TitleTextIcon = styled(TitleTextIc)`
  width: 5rem;
`;

const ProducerCategoryTextIcon = styled(ProducerCategoryTextIc)`
  margin-left: 43rem;
  width: 10.5rem;
`;

const CategoryTextIcon = styled(CategoryTextIc)`
  margin-left: 10.7rem;
  width: 10.3rem;
`;

const HashtagTextIcon = styled(HashtagTextIc)`
  margin-left: 10.7rem;
  width: 9.3rem;
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

const ThumnailWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8.3rem;
  height: 8.3rem;

  margin-right: 2.8rem;

  border-radius: 6.55rem;
  overflow: hidden;
`;
const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const TrackText = styled.div<{ width: number; isHoverActive: boolean }>`
  width: ${(props) => props.width}rem;
  ${({ theme }) => theme.fonts.body1};
  :hover {
    color: ${({ isHoverActive, theme }) => isHoverActive && theme.colors.sub1};
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
