import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ProducerProfilePauseIc, ProducerProfilePlayIc } from "../../assets";
import { playMusic } from "../../recoil/player";
import { ProducerPortfolioType } from "../../type/producerProfile";
import usePlay from "../../utils/hooks/usePlay";
import PortfoliosInform from "../@common/portfoliosInform";
import { isNotSameIndex, isSameIndex } from "../../utils/common/checkIndex";
import { currentUser } from "../../core/constants/userType";

interface PropsType {
  portfolioData: ProducerPortfolioType[];
  isMe: boolean;
  profileState: string;
  stateChange: boolean;
  audio: HTMLAudioElement;
  pauseAudio: () => void;
  getAudioInfos: (title: string, name: string, image: string, duration: number) => void;
  producerName: string;
  whom: string;
  changeKey: any;
}

export default function ProducerPortFolioList(props: PropsType) {
  const {
    portfolioData,
    isMe,
    profileState,
    stateChange,
    audio,
    pauseAudio,
    getAudioInfos,
    producerName,
    whom,
    changeKey,
  } = props;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [play, setPlay] = useRecoilState(playMusic);
  const { clickedIndex, setClickedIndex, playAudio } = usePlay(audio, portfolioData, "profile");

  useEffect(() => {
    resetState();
  }, [stateChange]);

  useEffect(() => {
    getAudioInfos(
      portfolioData[clickedIndex]?.title,
      producerName,
      portfolioData[clickedIndex]?.jacketImage,
      portfolioData[clickedIndex]?.wavFileLength,
    );
  }, [clickedIndex]);

  function resetState(): void {
    setHoveredIndex(-1);
    setClickedIndex(-1);
    setPlay(false);
  }

  function hoverPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function hoverOutPortfolio(id: number) {
    id !== clickedIndex && setHoveredIndex(-1);
  }

  return (
    <>
      <ProfileListContainer>
        {portfolioData.map((portfolio, index) => {
          return (
            <PortfolioBox
              key={portfolio.id}
              isLarge={isSameIndex(index, 0) || isSameIndex(clickedIndex, index)}
              onMouseEnter={() => hoverPortfolio(index)}
              onMouseLeave={() => hoverOutPortfolio(index)}
              index={index}
              profileState={profileState}
              producerPortfolioClickBool={isSameIndex(clickedIndex, index)}>
              <div>
                {((isSameIndex(hoveredIndex, index) &&
                  isNotSameIndex(clickedIndex, index) &&
                  isNotSameIndex(hoveredIndex, -1)) ||
                  (!play &&
                    isSameIndex(hoveredIndex, index) &&
                    isSameIndex(clickedIndex, index) &&
                    isNotSameIndex(hoveredIndex, -1))) && <ProducerProfilePauseIcon onClick={() => playAudio(index)} />}
                {play &&
                  isSameIndex(clickedIndex, index) &&
                  isSameIndex(hoveredIndex, index) &&
                  isNotSameIndex(hoveredIndex, -1) &&
                  isNotSameIndex(clickedIndex, -1) && <ProducerProfilePlayIcon onClick={pauseAudio} />}

                {isSameIndex(hoveredIndex, index) && isNotSameIndex(hoveredIndex, -1) && (
                  <ProducerPorfolioBlur
                    index={index}
                    producerPortfolioClickBool={isSameIndex(clickedIndex, index)}
                    profileState={profileState}
                  />
                )}
                <PortfolioImageWrapper
                  isLarge={isSameIndex(index, 0) || isSameIndex(clickedIndex, index)}
                  index={index}
                  profileState={profileState}
                  clickBool={isSameIndex(clickedIndex, index)}
                  hoverBool={isSameIndex(hoveredIndex, index)}>
                  <PortfolioImage
                    src={portfolio.jacketImage}
                    clickBool={isSameIndex(clickedIndex, index)}
                    hoverBool={isSameIndex(hoveredIndex, index)}
                  />
                </PortfolioImageWrapper>
              </div>
              <TitleWrapper>
                {isSameIndex(index, 0) &&
                  isNotSameIndex(hoveredIndex, index) &&
                  isNotSameIndex(clickedIndex, index) && (
                    <AudioTitle
                      hoverBool={isSameIndex(hoveredIndex, index)}
                      clickBool={isSameIndex(clickedIndex, index)}>
                      {portfolio.title}
                    </AudioTitle>
                  )}
                {isNotSameIndex(index, 0) && (
                  <AudioTitle hoverBool={isSameIndex(hoveredIndex, index)} clickBool={isSameIndex(clickedIndex, index)}>
                    {portfolio.title}
                  </AudioTitle>
                )}
              </TitleWrapper>
            </PortfolioBox>
          );
        })}
      </ProfileListContainer>
      {portfolioData && (
        <InformWrapper>
          <PortfoliosInform
            isMe={isMe}
            hoverId={hoveredIndex}
            clickId={clickedIndex}
            portfolios={portfolioData}
            profileState={profileState}
            whom={currentUser.PRODUCER}
            pauseAudio={pauseAudio}
          />
        </InformWrapper>
      )}
    </>
  );
}

const TitleWrapper = styled.div`
  width: 14rem;
  height: 5rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
`;

const ProducerPorfolioBlur = styled.div<{ index: number; producerPortfolioClickBool: boolean; profileState: string }>`
  position: absolute;
  width: ${({ producerPortfolioClickBool, profileState, index }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  height: ${({ producerPortfolioClickBool, profileState, index }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  border-radius: 50%;
  transform: rotate(45deg);
  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`;

const InformWrapper = styled.div`
  margin-left: -77.2rem;
`;

const ProfileListContainer = styled.section`
  width: 47.8rem;
  border: 0.3rem solid transparent;
  border-top-left-radius: 47.8rem;
  border-top-right-radius: 47.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: -16rem;
  margin-top: 23.3rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to bottom, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const PortfolioBox = styled.article<{
  isLarge: boolean;
  index: number;
  profileState: string;
  producerPortfolioClickBool: boolean;
}>`
  width: ${({ producerPortfolioClickBool, profileState, index }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  height: ${({ producerPortfolioClickBool, profileState, index }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || producerPortfolioClickBool ? 42 : 21.8}rem;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  margin-top: ${({ index, profileState }) => (isSameIndex(index, 0) && profileState !== "Vocal Searching" ? 3 : 4)}rem;
  margin-top: ${({ index, profileState }) => isSameIndex(index, 0) && profileState === "Vocal Searching" && 13}rem;
  margin-top: ${({ index, profileState, producerPortfolioClickBool }) =>
    isSameIndex(index, 0) && profileState === "Vocal Searching" && producerPortfolioClickBool && 3}rem;
  :hover {
    box-shadow: 0 0 4rem ${({ theme }) => theme.colors.sub1};
  }
`;

const PortfolioImageWrapper = styled.div<{
  isLarge: boolean;
  index: number;
  profileState: string;
  clickBool: boolean;
  hoverBool: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: ${({ clickBool, index, profileState }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || clickBool ? 42 : 21.8}rem;
  width: ${({ clickBool, index, profileState }) =>
    (isSameIndex(index, 0) && profileState !== "Vocal Searching") || clickBool ? 42 : 21.8}rem;
  border-radius: 25rem;
  // position: absolute;
  overflow: hidden;
`;

const PortfolioImage = styled.img<{
  clickBool: boolean;
  hoverBool: boolean;
}>`
  width: 100%;
  height: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
  opacity: ${({ hoverBool, clickBool }) => !hoverBool && !clickBool && 0.2};
`;

const ProducerProfilePauseIcon = styled(ProducerProfilePauseIc)`
  position: absolute;
  z-index: 5;
  width: 42rem;
  height: 42rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const ProducerProfilePlayIcon = styled(ProducerProfilePlayIc)`
  position: absolute;
  z-index: 5;
  width: 42rem;
  height: 42rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const AudioTitle = styled.h1<{ hoverBool: boolean; clickBool: boolean }>`
  color: ${({ theme }) => theme.colors.gray2};
  display: ${({ hoverBool, clickBool }) => (hoverBool || clickBool) && "none"};
  ${({ theme }) => theme.fonts.id}
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
