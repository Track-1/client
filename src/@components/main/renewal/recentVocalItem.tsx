import styled, { css } from "styled-components";
import { useContext, useEffect } from "react";
import { PlayerContext } from "../../../context/playerContext";
import usePlaySelectedTrack from "../../../hooks/common/usePlaySelectedTrack";
import { FilteredVocalType } from "../../../type/vocals";
import { PauseIc, PlayIc } from "../../../assets";

interface RecentVocalItemProps {
  vocalInfo: FilteredVocalType;
  playingTrack: FilteredVocalType["userId"] | null;
  selectTrack: (trackId: FilteredVocalType["userId"]) => void;
}

export default function RecentVocalItem(props: RecentVocalItemProps) {
  const { vocalInfo, playingTrack, selectTrack } = props;
  const isSelected = playingTrack === vocalInfo.userId;
  const { contextPlaying, getPlayerInfo, showPlayer, quitAudioForMovePage, ...playerContext } =
    useContext(PlayerContext);

  const { innerPlaying, isHovered, playAudioItem, stopAudioItem, hoverTrack, unhoverTrack } = usePlaySelectedTrack(
    playerContext,
    vocalInfo.userAudioFile,
    vocalInfo.userId,
    selectTrack,
  );

  useEffect(() => {
    if (!isSelected) return;

    getPlayerInfo({
      imageFile: vocalInfo.userImageFile,
      title: vocalInfo.userTitle,
      userName: vocalInfo.userName,
    });
  }, [playingTrack]);

  return (
    <Styled.Container>
      <Styled.TrackImageWrapper>
        <Styled.TrackImageFrame
          onMouseLeave={unhoverTrack}
          onMouseEnter={hoverTrack}
          isHovered={isHovered || (isSelected && showPlayer)}>
          <Styled.TrackImage src={vocalInfo.userImageFile} alt="앨범 자켓 이미지" />
          {(isHovered || (isSelected && showPlayer)) &&
            (innerPlaying && contextPlaying ? (
              <Styled.PauseIcon onClick={stopAudioItem} />
            ) : (
              <Styled.PlayIcon onClick={playAudioItem} />
            ))}
        </Styled.TrackImageFrame>
      </Styled.TrackImageWrapper>

      <Styled.TrackInfoWrapper>
        <Styled.TrackCategory>{vocalInfo.userCategory[0]}</Styled.TrackCategory>
        <Styled.UserName>{vocalInfo.userName}</Styled.UserName>
        {vocalInfo.userKeyword.map((keyword) => (
          <Styled.TrackKeyword key={vocalInfo.userId}>#{keyword}</Styled.TrackKeyword>
        ))}
      </Styled.TrackInfoWrapper>
    </Styled.Container>
  );
}

const Styled = {
  Container: styled.li`
    display: flex;

    width: 45rem;

    /* padding-bottom: 10rem; */
  `,

  TrackImageWrapper: styled.div`
    width: 20rem;
    height: 100%;
  `,

  TrackImageFrame: styled.div<{ isHovered: boolean }>`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    width: 16.6rem;
    height: 16.6rem;

    border-radius: 50%;

    overflow: hidden;
    cursor: pointer;

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
    transform: translate(50, 50);
    object-fit: cover;
    margin: auto;
  `,

  TrackInfoWrapper: styled.div`
    display: flex;
    flex-direction: column;
  `,

  TrackCategory: styled.p`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.colors.sub2};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,

  UserName: styled.p`
    margin-bottom: 2.8rem;

    color: ${({ theme }) => theme.colors.white};
    ${({ theme }) => theme.fonts.pretendard_text22};
  `,

  TrackKeyword: styled.p`
    margin-bottom: 1rem;

    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.pretendard_text20};
  `,

  PlayIcon: styled(PlayIc)`
    position: absolute;

    width: 3.4rem;

    cursor: pointer;
  `,

  PauseIcon: styled(PauseIc)`
    position: absolute;

    width: 3rem;

    cursor: pointer;
  `,
};
