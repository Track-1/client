import styled, { css } from "styled-components";
import { FilteredTrackType } from "../../../type/tracks";
import { useContext, useEffect } from "react";
import usePlaySelectedTrack from "../../../hooks/common/usePlaySelectedTrack";
import { PlayerContext } from "../../../context/playerContext";
import { PauseIc, PlayIc } from "../../../assets";

interface RecentTrackItemProps {
  trackInfo: FilteredTrackType;
  playingTrack: FilteredTrackType["trackId"] | null;
  selectTrack: (trackId: FilteredTrackType["trackId"]) => void;
}

export default function RecentTrackItem(props: RecentTrackItemProps) {
  const { trackInfo, playingTrack, selectTrack } = props;

  const isSelected = playingTrack === trackInfo.trackId;
  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    playerContext,
    trackInfo.trackAudioFile,
    trackInfo.trackId,
    selectTrack,
  );

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: trackInfo.trackImageFile,
      title: trackInfo.trackTitle,
      userName: trackInfo.trackUserName,
    });
  }, [playingTrack]);

  return (
    <Styled.Container>
      <Styled.TrackImageWrapper
        onMouseLeave={unhoverTrack}
        onMouseEnter={hoverTrack}
        isHovered={isHovered || (isSelected && showPlayer)}>
        <Styled.TrackImage src={trackInfo.trackImageFile} alt="프로듀서 트랙 이미지" />

        {(isHovered || (isSelected && showPlayer)) &&
          (innerPlaying && contextPlaying ? (
            <>
              <Styled.TrackKeywordWrapper>
                {trackInfo.trackKeyword.map((keyword) => (
                  <Styled.TrackKeyword key={keyword}>#{keyword}</Styled.TrackKeyword>
                ))}
              </Styled.TrackKeywordWrapper>
              <Styled.PauseIcon onClick={stopAudioItem} />
            </>
          ) : (
            <>
              <Styled.TrackKeywordWrapper>
                {trackInfo.trackKeyword.map((keyword) => (
                  <Styled.TrackKeyword key={keyword}>#{keyword}</Styled.TrackKeyword>
                ))}
              </Styled.TrackKeywordWrapper>
              <Styled.PlayIcon onClick={playAudioItem} />
            </>
          ))}
      </Styled.TrackImageWrapper>
      <Styled.TrackCategory>{trackInfo.trackCategory}</Styled.TrackCategory>
      <Styled.TrackTitle>{trackInfo.trackTitle}</Styled.TrackTitle>
      <Styled.UserName>{trackInfo.trackUserName}</Styled.UserName>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.article`
    display: flex;
    flex-direction: column;
  `,

  TrackImageWrapper: styled.div<{ isHovered: boolean }>`
    position: relative;

    display: flex;

    width: 30rem;
    height: 30rem;

    overflow: hidden;
    cursor: pointer;

    margin-bottom: 3rem;

    ${({ isHovered }) =>
      isHovered &&
      css`
        ::before {
          position: absolute;
          top: 0;
          right: 0;

          content: "";
          width: 100%;
          height: 100%;

          background-color: rgba(0, 0, 0, 0.75); /* 원하는 색상과 투명도를 설정 */
        }
      `}
  `,

  TrackImage: styled.img`
    width: 100%;
    height: 100%;

    object-fit: cover;
  `,

  TrackCategory: styled.p`
    margin-bottom: 1.5rem;

    color: ${({ theme }) => theme.colors.sub1};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,

  TrackTitle: styled.p`
    margin-bottom: 2rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,

  TrackKeywordWrapper: styled.div`
    position: absolute;
    left: 3.5rem;
    top: 3.5rem;
  `,

  TrackKeyword: styled.p`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,

  UserName: styled.p`
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,

  PlayIcon: styled(PlayIc)`
    position: absolute;

    right: 3.5rem;
    bottom: 3.5rem;

    width: 3.4rem;

    cursor: pointer;
  `,
  PauseIcon: styled(PauseIc)`
    position: absolute;

    right: 3.5rem;
    bottom: 3.5rem;

    width: 3rem;

    cursor: pointer;
  `,
};
