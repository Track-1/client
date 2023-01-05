import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VocalSleepIc, VocalNonSleepIc, VocalHoverPlayIc, VocalHoverPauseIc } from "../../assets";
import vocals from "../../mocks/vocalsListDummy.json";
import { showPlayerBar, playMusic, trackClicked, selectedId } from "../../recoil/player";

export default function VocalList() {
  const [hoverVocal, setHoverVocal] = useState<number>(-1);
  const [clickVocal, setClickVocal] = useRecoilState<number>(trackClicked);
  const [showPlayer, setShowPlayer] = useRecoilState<boolean>(showPlayerBar);
  const [play, setPlay] = useRecoilState<boolean>(playMusic);
  const [beatId, setBeatId] = useRecoilState<number>(selectedId);

  const navigate = useNavigate();

  function mouseOverVocal(id: number) {
    setHoverVocal(id);
  }

  function mouseOutVocal() {
    setHoverVocal(-1);
  }

  function onClickVocal(id: number) {
    setShowPlayer(true);
    setPlay(true);
    setBeatId(id);
    setClickVocal(id);
  }

  function onClickPauseVocal() {
    if (play === true) {
      setPlay(false);
    }
  }

  function clickVocalName(id: number) {
    navigate("/vocal-profile", { state: id });
  }

  return (
    <VocalListContainer>
      {vocals.map(({ id, imgSrc, producer, category, categoryNum, hashtags }) => (
        <VocalContainer key={id}>
          <UsernameInformWrapper>
            <Username onClick={() => clickVocalName(id)}>{producer}</Username>
            <VocalSleepIcon />
            <VocalNonSleepIcon />
          </UsernameInformWrapper>

          <CategoryTextWrapper>
            <CategoryText>{category}</CategoryText>
            <CategoryNum>+{categoryNum}</CategoryNum>
          </CategoryTextWrapper>

          <MusicProfileWrapper
            onMouseLeave={mouseOutVocal}
            onMouseEnter={() => mouseOverVocal(id)}
            onClick={() => {
              onClickVocal(id);
              onClickPauseVocal();
            }}
            showPlayer={showPlayer}
            hoverVocalBool={hoverVocal === id}
            clickVocalBool={clickVocal === id}
            clickVocal={clickVocal}>
            <GradientLine>
              <AlbumCoverImg src={require("../../assets/image/" + imgSrc + ".png")} alt="앨범자켓사진" />
            </GradientLine>
            <GradientProfile
              hoverVocalBool={hoverVocal === id}
              clickVocalBool={clickVocal === id}
              clickVocal={clickVocal}></GradientProfile>
            {play && clickVocal === id && clickVocal !== -1 && (
              <VocalHoverPauseIcon
                hoverVocalBool={hoverVocal === id}
                clickVocalBool={clickVocal === id}
                clickVocal={clickVocal}
              />
            )}
            {((clickVocal !== id && hoverVocal === id && hoverVocal !== -1) ||
              (!play && clickVocal === id && clickVocal !== -1)) && <VocalHoverPlayIcon />}
          </MusicProfileWrapper>

          <HashtagUl>
            {hashtags.map((tag, idx) => (
              <HashtagLi key={idx}>#{tag}</HashtagLi>
            ))}
          </HashtagUl>
        </VocalContainer>
      ))}
    </VocalListContainer>
  );
}

const VocalListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  padding-top: 5.6rem;
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

  width: 28.5rem;

  line-height: 3.1rem;
  font-size: 2.4rem;
  align-items: center;

  cursor: pointer;
`;

const VocalSleepIcon = styled(VocalSleepIc)`
  display: block;
`;

const VocalNonSleepIcon = styled(VocalNonSleepIc)`
  display: none;
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

  font-family: "Pretendard";
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 180%;

  padding: 0.5rem 0.6rem 0.6rem 0.4rem;

  color: ${({ theme }) => theme.colors.gray2};
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const AlbumCoverImg = styled.img`
  position: relative;
`;

const GradientProfile = styled.div<{ hoverVocalBool: boolean; clickVocalBool: boolean; clickVocal: number }>`
  position: absolute;

  width: 23.4rem;
  height: 23.4rem;

  top: 2.5rem;
  right: 1.9rem;

  cursor: pointer;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.sub3} 15.32%,
    ${({ hoverVocalBool, clickVocalBool, clickVocal }) =>
      hoverVocalBool || (clickVocalBool && clickVocal !== -1)
        ? " rgba(13, 14, 17, 0.7) 53.49%"
        : " rgba(13, 14, 17, 0) 53.49%"},
    ${({ theme }) => theme.colors.sub3} 92.93%
  );
`;

const VocalHoverPauseIcon = styled(VocalHoverPauseIc)<{
  hoverVocalBool: boolean;
  clickVocalBool: boolean;
  clickVocal: number;
}>`
  display: ${({ hoverVocalBool, clickVocalBool, clickVocal }) =>
    hoverVocalBool || (clickVocalBool && clickVocal !== -1) ? "" : "none"};
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
  hoverVocalBool: boolean;
  clickVocalBool: boolean;
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
      ${({ hoverVocalBool, clickVocalBool, clickVocal, theme }) =>
          (hoverVocalBool || (clickVocalBool && clickVocal !== -1)) && theme.colors.sub2}
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
  right: 6rem;
`;

const HashtagLi = styled.li`
  height: 3.8rem;

  padding: 1.7rem 1.5rem;
  margin-bottom: 1rem;

  line-height: 0.5rem !important;

  border-radius: 2.1rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.hashtag};
`;
