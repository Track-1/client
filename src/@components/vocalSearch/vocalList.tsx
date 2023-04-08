import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VocalSleepIc, VocalHoverPlayIc, VocalHoverPauseIc } from "../../assets";
import { showPlayerBar, playMusic } from "../../recoil/player";
import { VocalSearchType } from "../../type/vocalSearchType";
import usePlay from "../../utils/hooks/usePlay";
import { VocalsDataType } from "../../type/vocalsDataType";

interface PropsType {
  vocalData: VocalSearchType[];
  audio: HTMLAudioElement;
  getAudioInfos: (title: string, name: string, image: string, duration: number) => void;
}

export default function VocalList(props: PropsType) {
  const { vocalData, audio, getAudioInfos } = props;
  const navigate = useNavigate();

  const [hoverVocal, setHoverVocal] = useState<number>(-1);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);

  const { clickedIndex, playAudio } = usePlay(audio, vocalData, "vocals");

  function mouseOverPlayVocal(id: number) {
    setHoverVocal(id);
  }

  function mouseOutPlayVocal() {
    setHoverVocal(-1);
  }

  useEffect(() => {
    getAudioInfos(
      vocalData[clickedIndex]?.title,
      vocalData[clickedIndex]?.vocalName,
      vocalData[clickedIndex]?.vocalProfileImage,
      vocalData[clickedIndex]?.wavFileLength,
    );
  }, [clickedIndex]);

  function pauseAudio(id: number) {
    audio?.pause();
    setPlay(false);
  }

  function moveVocalProfilePage(vocalId: number) {
    pauseAudio(clickedIndex);
    setShowPlayer(false);
    navigate(`/vocal-profile/${vocalId}`, { state: vocalId });
  }

  return (
    <VocalListContainer>
      {vocalData &&
        vocalData?.map((vocal, index) => (
          <VocalContainer key={index}>
            <UsernameInformWrapper>
              <Username onClick={() => moveVocalProfilePage(vocal?.vocalId)}>{vocal?.vocalName}</Username>
              {vocal?.isSelected && <VocalSleepIcon />}
            </UsernameInformWrapper>

            <CategoryTextWrapper>
              <CategoryText>{vocal?.category[0]}</CategoryText>
              <CategoryNum>+{vocal?.totalCategNum}</CategoryNum>
            </CategoryTextWrapper>

            <MusicProfileWrapper
              onMouseLeave={mouseOutPlayVocal}
              onMouseEnter={() => mouseOverPlayVocal(index)}
              showPlayer={showPlayer}
              isHoverVocal={hoverVocal === index}
              isClickVocal={clickedIndex === index}
              clickVocal={clickedIndex}>
              <GradientLine>
                <AlbumCoverImg src={vocal?.vocalProfileImage} alt="앨범자켓사진" />
              </GradientLine>
              <GradientProfile
                isHoverVocal={hoverVocal === index}
                isClickVocal={clickedIndex === index}
                clickVocal={clickedIndex}></GradientProfile>
              {play && clickedIndex === index && clickedIndex !== -1 && (
                <VocalHoverPauseIcon
                  isHoverVocal={hoverVocal === index}
                  isClickVocal={clickedIndex === index}
                  clickVocal={clickedIndex}
                  onClick={() => {
                    pauseAudio(index);
                  }}
                />
              )}
              {((clickedIndex !== index && hoverVocal === index && hoverVocal !== -1) ||
                (!play && clickedIndex === index && clickedIndex !== -1)) && (
                <VocalHoverPlayIcon onClick={() => playAudio(index)} />
              )}
            </MusicProfileWrapper>

            <HashtagUl>
              {vocal.keyword.map((tag, idx) => (
                <HashtagLi key={idx}>#{tag}</HashtagLi>
              ))}
            </HashtagUl>
          </VocalContainer>
        ))}
      <InfiniteDiv> 아아 </InfiniteDiv>
    </VocalListContainer>
  );
}

const VocalListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 4rem;
  padding-left: 9rem;
`;

const VocalContainer = styled.div`
  display: inline-block;
  width: 37.4rem;
  height: 44rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1};
`;

const UsernameInformWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 1;
  margin-top: 1.8rem;
`;

const Username = styled.span`
  display: flex;
  width: 70%;

  line-height: 3.1rem;
  font-size: 2.4rem;
  align-items: center;
  margin-bottom: 1.1rem;
  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.sub2};
  }
`;

const VocalSleepIcon = styled(VocalSleepIc)`
  width: 4rem;
  height: 4rem;
  display: block;
  position: absolute;
  right: 6.2rem;
`;

const CategoryTextWrapper = styled.div``;

const CategoryText = styled.span`
  color: ${({ theme }) => theme.colors.gray3};
  margin-right: 0.5rem;
`;

const CategoryNum = styled.span`
  position: relative;
  z-index: 1;
  border-radius: 50%;
  ${({ theme }) => theme.fonts.description};
  padding: 0.5rem 0.6rem 0.6rem 0.4rem;
  color: ${({ theme }) => theme.colors.gray2};
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const AlbumCoverImg = styled.img`
  position: relative;
  transform: rotate(-45deg);
  object-fit: cover;
  width: 130%;
  height: 130%;
  bottom: 3rem;
  right: 3rem;
`;

const GradientProfile = styled.div<{ isHoverVocal: boolean; isClickVocal: boolean; clickVocal: number }>`
  position: absolute;
  width: 24.341rem;
  height: 24.341rem;
  top: 2.5rem;
  right: 1.9rem;
  cursor: pointer;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.sub3} 15.32%,
    ${({ isHoverVocal, isClickVocal, clickVocal }) =>
      isHoverVocal || (isClickVocal && clickVocal !== -1)
        ? " rgba(13, 14, 17, 0.7) 53.49%"
        : " rgba(13, 14, 17, 0) 53.49%"},
    ${({ theme }) => theme.colors.sub3} 92.93%
  );
`;

const VocalHoverPauseIcon = styled(VocalHoverPauseIc)<{
  isHoverVocal: boolean;
  isClickVocal: boolean;
  clickVocal: number;
}>`
  display: ${({ isHoverVocal, isClickVocal, clickVocal }) =>
    isHoverVocal || (isClickVocal && clickVocal !== -1) ? "" : "none"};
  position: absolute;
  top: 0;
  width: 8.4rem;
  height: 8.4rem;

  margin-left: 10rem;
  margin-top: 10rem;
  transform: rotate(-45deg);
  cursor: pointer;
`;

const VocalHoverPlayIcon = styled(VocalHoverPlayIc)`
  width: 8.4rem;
  height: 8.4rem;
  position: absolute;
  top: 0;
  margin-left: 10rem;
  margin-top: 10rem;
  transform: rotate(-45deg);
  cursor: pointer;
`;

const MusicProfileWrapper = styled.div<{
  isHoverVocal: boolean;
  isClickVocal: boolean;
  clickVocal: number;
  showPlayer: boolean;
}>`
  position: relative;
  display: inline-block;
  width: 28.4rem;
  height: 28.4rem;
  top: -1.5rem;
  left: 0.3rem;
  transform: rotate(45deg);
  border-radius: 5rem;
  border: 0.3rem solid transparent;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(
      to top,
      ${({ isHoverVocal, isClickVocal, clickVocal, theme }) =>
          (isHoverVocal || (isClickVocal && clickVocal !== -1)) && theme.colors.sub2}
        0%,
      ${({ theme }) => theme.colors.sub3} 50%,
      ${({ theme }) => theme.colors.sub3} 100%
    );
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const GradientLine = styled.div`
  display: inline-block;
  overflow: hidden;
  width: 23.4rem;
  height: 23.4rem;
  margin: 2.5rem;
  border-radius: 4rem;
  background-color: ${({ theme }) => theme.colors.sub3};
`;

const HashtagUl = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  bottom: 8.5rem;
  right: 7.5rem;
`;

const HashtagLi = styled.li`
  height: 3.8rem;
  padding: 1.7rem 1.5rem;
  margin-bottom: 1rem;
  line-height: 0.3rem !important;
  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.hashtag};
`;

const InfiniteDiv = styled.div`
  width: 100%;
  height: 1rem;
`;
