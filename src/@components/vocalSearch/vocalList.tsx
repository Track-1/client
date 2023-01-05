import { useState } from "react";
import styled from "styled-components";
import { VocalSleepIc, VocalNonSleepIc, VocalHoverPlayIc, VocalHoverPauseIc } from "../../assets";
import vocals from "../../mocks/vocalsListDummy.json";
import { showPlayerBar, playMusic, trackClicked, selectedId } from "../../recoil/player";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

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

          <MusicProfile
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
            <GradientEffect>
              <AlbumCoverImg src={require("../../assets/image/" + imgSrc + ".png")} alt="앨범자켓사진" />
            </GradientEffect>
            <ProfileGradient
              hoverVocalBool={hoverVocal === id}
              clickVocalBool={clickVocal === id}
              clickVocal={clickVocal}></ProfileGradient>
            {play && clickVocal === id && clickVocal !== -1 && (
              <VocalHoverPauseIcon
                hoverVocalBool={hoverVocal === id}
                clickVocalBool={clickVocal === id}
                clickVocal={clickVocal}
              />
            )}
            {((clickVocal !== id && hoverVocal === id && hoverVocal !== -1) ||
              (!play && clickVocal === id && clickVocal !== -1)) && <VocalHoverPlayIcon />}
          </MusicProfile>
          <Hashtags>
            {hashtags.map((tag, idx) => (
              <Hashtag key={idx}>#{tag}</Hashtag>
            ))}
          </Hashtags>
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
  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};
`;
const UsernameInformWrapper = styled.div`
  display: flex;
  margin-top: 1.8rem;
  position: relative;
  z-index: 1;
`;

const Username = styled.span`
  display: flex;
  align-items: center;
  width: 28.5rem;
  font-size: 2.4rem;
  line-height: 3.1rem;
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
  color: ${({ theme }) => theme.colors.gray2};
  background-color: ${({ theme }) => theme.colors.gray5};
  font-family: "Pretendard";
  padding: 0.5rem 0.6rem 0.6rem 0.4rem;
  border-radius: 50%;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 180%;
  position: relative;
  z-index: 1;
`;

const AlbumCoverImg = styled.img`
  position: relative;
`;

const ProfileGradient = styled.div<{ hoverVocalBool: boolean; clickVocalBool: boolean; clickVocal: number }>`
  position: absolute;
  top: 0;
  width: 23.4rem;
  height: 23.4rem;
  top: 25px;
  right: 19px;
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

const MusicProfile = styled.div<{
  hoverVocalBool: boolean;
  clickVocalBool: boolean;
  clickVocal: number;
  showPlayer: boolean;
}>`
  position: relative;
  display: inline-block;
  width: 28.4rem;
  height: 28.4rem;
  top: -15px;
  left: 3px;
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

const GradientEffect = styled.div`
  display: inline-block;
  width: 23.4rem;
  height: 23.4rem;
  background-color: ${({ theme }) => theme.colors.sub3};
  border-radius: 4rem;
  overflow: hidden;
  margin: 2.5rem;
`;

const Hashtags = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;
  bottom: 8.5rem;
  right: 6rem;
`;
const Hashtag = styled.li`
  height: 3.8rem;
  padding: 1.7rem 1.5rem;
  border-radius: 2.1rem;
  background-color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.hashtag};
  line-height: 0.5rem;
  margin-bottom: 1rem;
`;
