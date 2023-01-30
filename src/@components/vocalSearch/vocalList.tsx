import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VocalSleepIc, VocalHoverPlayIc, VocalHoverPauseIc } from "../../assets";
import { showPlayerBar, playMusic, audioFile } from "../../recoil/player";
import { VocalSearchType } from "../../type/vocalSearchType";

interface PropsType {
  vocalData: VocalSearchType[];
  audio: HTMLAudioElement;
  getDuration: (durationTime: number) => void;
  getAudioInfos: (title: string, image: string) => void;
}

export default function VocalList(props: PropsType) {
  const { vocalData, audio, getDuration, getAudioInfos } = props;
  const navigate = useNavigate();

  const [hoverVocal, setHoverVocal] = useState<number>(-1);
  const [clickVocal, setClickVocal] = useState<number>(-1);
  const [beatId, setBeatId] = useState<number>(-1);

  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [currentFile, setCurrentFile] = useRecoilState<string>(audioFile);

  useEffect(() => {
    audio.play();
  }, [currentFile]);

  useEffect(() => {
    setCurrentFile(vocalData[clickVocal]?.vocalTitleFile && vocalData[clickVocal]?.vocalTitleFile);
    audio.src = vocalData[clickVocal]?.vocalTitleFile && vocalData[clickVocal]?.vocalTitleFile;
    vocalData[clickVocal]?.vocalTitleFile && console.log(vocalData[clickVocal]?.vocalTitleFile);
    getDuration(vocalData[clickVocal]?.wavFileLength);
    getAudioInfos("시간의 지평선", vocalData[clickVocal]?.vocalProfileImage);
  }, [clickVocal]);

  function mouseOverPlayVocal(id: number) {
    setHoverVocal(id);
  }

  function mouseOutPlayVocal() {
    setHoverVocal(-1);
  }

  function playAudioOnTrack(index: number, id: number) {
    if (clickVocal === index) {
      audio.play();
      setPlay(true);
    } else {
      console.log(clickVocal, index, "not same");
      setPlay(true);

      setShowPlayer(true);
      setBeatId(id);
      setClickVocal(index);
    }
  }

  function onClickPauseVocal(id: number) {
    audio.pause();
    setPlay(false);
  }

  function clickVocalName(id: number) {
    navigate(`/vocal-profile/${id}`, { state: id });
  }

  function checkActiveVocal(isActive: boolean) {
    if (!isActive) {
      return <VocalSleepIcon />;
    }
  }

  function checkHover(id: number) {
    return hoverVocal === id ? true : false;
  }

  function checkClick(id: number) {
    return clickVocal === id ? true : false;
  }

  function showPlayIcon(id: number, vocalId: number) {
    if ((!play && checkHover(id)) || (!play && checkClick(id)) || (play && !checkClick(id) && checkHover(id))) {
      return <VocalHoverPlayIcon onClick={() => playAudioOnTrack(id, vocalId)} />;
    }
  }

  function showPauseIcon(id: number) {
    if (play && checkClick(id)) {
      return (
        <VocalHoverPauseIcon
          isHoverVocal={hoverVocal === id}
          isClickVocal={clickVocal === id}
          onClick={() => {
            onClickPauseVocal(id);
          }}
        />
      );
    }
  }

  return (
    <VocalListContainer>
      {vocalData &&
        vocalData.map((vocal, index) => (
          <VocalContainer key={index}>
            <UsernameInformWrapper>
              <Username onClick={() => clickVocalName(vocal.vocalId)}>{vocal.vocalName}</Username>
              {checkActiveVocal(vocal.isSelected)}
            </UsernameInformWrapper>

            <CategoryTextWrapper>
              <CategoryText>{vocal.category[0]}</CategoryText>
              <CategoryNum>+{vocal.totalCategNum}</CategoryNum>
            </CategoryTextWrapper>

            <MusicProfileWrapper
              onMouseLeave={mouseOutPlayVocal}
              onMouseEnter={() => mouseOverPlayVocal(index)}
              showPlayer={showPlayer}
              isHoverVocal={hoverVocal === index}
              isClickVocal={clickVocal === index}>
              <GradientLine>
                <AlbumCoverImg src={vocal.vocalProfileImage} alt="앨범자켓사진" />
              </GradientLine>
              <GradientProfile
                isHoverVocal={hoverVocal === index}
                isClickVocal={clickVocal === index}></GradientProfile>

              {showPauseIcon(index)}
              {showPlayIcon(index, vocal.vocalId)}
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

const GradientProfile = styled.div<{ isHoverVocal: boolean; isClickVocal: boolean }>`
  position: absolute;
  width: 23.4rem;
  height: 23.4rem;
  top: 2.5rem;
  right: 1.9rem;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.sub3} 15.32%,
    ${({ isHoverVocal, isClickVocal }) =>
      isHoverVocal || isClickVocal ? " rgba(13, 14, 17, 0.7) 53.49%" : " rgba(13, 14, 17, 0) 53.49%"},
    ${({ theme }) => theme.colors.sub3} 92.93%
  );
`;

const VocalHoverPauseIcon = styled(VocalHoverPauseIc)<{
  isHoverVocal: boolean;
  isClickVocal: boolean;
}>`
  display: ${({ isHoverVocal, isClickVocal }) => (isHoverVocal || isClickVocal ? "" : "none")};
  position: absolute;
  top: 0;
  margin-left: 10rem;
  margin-top: 10rem;
  transform: rotate(-45deg);
  cursor: pointer;
`;

const VocalHoverPlayIcon = styled(VocalHoverPlayIc)`
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
      ${({ isHoverVocal, isClickVocal, theme }) => (isHoverVocal || isClickVocal) && theme.colors.sub2} 0%,
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
