import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { playMusic } from "../../recoil/player";
import { VocalProfileBlurPauseIc, VocalProfileBlurPlayIc } from "../../assets";
import PortfoliosInform from "../@common/portfoliosInform";
import usePlay from "../../utils/hooks/usePlay";
import { VocalPortfolioType } from "../../type/vocalProfile";
import { currentUser } from "../../core/constants/userType";

interface PropsType {
  audio: HTMLAudioElement;
  isMe: boolean;
  portfolioData: VocalPortfolioType[];
  pauseAudio: () => void;
  infiniteRef: React.MutableRefObject<any>;
  getAudioInfos: (title: string, name: string, image: string, duration: number) => void;
  vocalName: string;
  whom: string;
}

export default function VocalProfileList(props: PropsType) {
  const { audio, isMe, portfolioData, pauseAudio, infiniteRef, getAudioInfos, vocalName, whom } = props;

  const vocalPortfolioCount = portfolioData ? portfolioData.length : 0;

  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);

  const [play, setPlay] = useRecoilState(playMusic);

  const { clickedIndex, playAudio } = usePlay(audio, portfolioData, "profile");

  useEffect(() => {
    getAudioInfos(
      portfolioData[clickedIndex]?.title,
      vocalName,
      portfolioData[clickedIndex]?.jacketImage,
      portfolioData[clickedIndex]?.wavFileLength,
    );
  }, [clickedIndex]);

  function mouseOverVocalPortfolio(id: number) {
    setHoveredIndex(id);
  }

  function mouseOutVocalPortfolio() {
    setHoveredIndex(-1);
  }

  return (
    <VocalProfileListWrapper>
      <VocalsPortfolioWrapper>
        {portfolioData &&
          portfolioData?.map((vocal: any, index: number) => (
            <VocalPortfolio
              key={vocal.id}
              onMouseEnter={() => mouseOverVocalPortfolio(index)}
              onMouseLeave={mouseOutVocalPortfolio}>
              {((hoveredIndex === index && clickedIndex !== index && hoveredIndex !== -1) ||
                (!play && hoveredIndex === index && clickedIndex === index && hoveredIndex !== -1)) && (
                <VocalProfileBlurPauseIcon onClick={() => playAudio(index)} />
              )}
              {play &&
                clickedIndex === index &&
                hoveredIndex === index &&
                hoveredIndex !== -1 &&
                clickedIndex !== -1 && <VocalProfileBlurPlayIcon onClick={pauseAudio} />}
              <VocalPortfolioTitle>
                {clickedIndex !== index && hoveredIndex !== index && vocal.title}
              </VocalPortfolioTitle>
              {hoveredIndex === index && hoveredIndex !== -1 && (
                <VocalPorfolioBlur idx={index} vocalPortfolioClickBool={clickedIndex === index} />
              )}
              <VocalPortfolioWrapper
                idx={index}
                vocalPortfolioHoverBool={hoveredIndex === index}
                vocalPortfolioClickBool={clickedIndex === index}>
                <VocalPortfolioImg
                  src={vocal?.jacketImage}
                  alt="보컬 포트폴리오이미지"
                  idx={index}
                  vocalPortfolioHoverBool={hoveredIndex === index}
                  vocalPortfolioClickBool={clickedIndex === index}
                />
              </VocalPortfolioWrapper>
            </VocalPortfolio>
          ))}
        <InfiniteDiv ref={infiniteRef}> </InfiniteDiv>
      </VocalsPortfolioWrapper>
      <VocalsBoxWrapper>
        <VocalsBoxBody vocalPortfolioCount={vocalPortfolioCount}></VocalsBoxBody>
        <VocalsBoxHead></VocalsBoxHead>
      </VocalsBoxWrapper>

      {portfolioData && (
        <PortfoliosInform
          isMe={isMe}
          hoverId={hoveredIndex}
          clickId={clickedIndex}
          portfolios={portfolioData}
          profileState={"Porfolio"}
          whom={whom}
        />
      )}
    </VocalProfileListWrapper>
  );
}
const InfiniteDiv = styled.div`
  width: 100%;
  height: 1rem;
`;

const VocalProfileListWrapper = styled.section`
  position: absolute;
  z-index: 5;

  width: 132rem;
  height: 100%;
`;

const VocalsBoxWrapper = styled.section``;

const VocalsBoxHead = styled.div`
  width: 36rem;
  height: 36rem;
  margin: 31rem 0 0 34.65rem;

  transform: rotate(45deg);

  border: 0.34rem solid ${({ theme }) => theme.colors.sub2};
  border-radius: 5rem 3rem 5.4rem 3rem;
`;

const VocalsBoxBody = styled.div<{ vocalPortfolioCount: number }>`
  position: absolute;
  z-index: 3;

  height: ${({ vocalPortfolioCount }) => (vocalPortfolioCount - 1) * 26 + 80}rem;
  width: 48.4rem;
  margin-left: 28.45rem;
  margin-top: 18rem;

  border-left: 0.34rem solid transparent;
  border-right: 0.34rem solid transparent;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to top, ${({ theme }) => theme.colors.sub3} -5%, ${({ theme }) => theme.colors.sub2} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const VocalsPortfolioWrapper = styled.section`
  position: absolute;
  z-index: 4;
  margin: 35rem 0 0 37rem;
`;

const VocalPortfolio = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VocalPortfolioTitle = styled.div`
  position: absolute;
  z-index: 5;

  display: flex;
  justify-content: center;

  width: 14rem;
  height: 5rem;
  margin-top: -6rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  text-align: center;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  ${({ theme }) => theme.fonts.id};
  color: ${({ theme }) => theme.colors.gray2};

  cursor: pointer;
`;

const VocalProfileBlurPlayIcon = styled(VocalProfileBlurPlayIc)`
  position: absolute;
  z-index: 10;

  margin-top: -8.5rem;
  cursor: pointer;
`;

const VocalProfileBlurPauseIcon = styled(VocalProfileBlurPauseIc)`
  position: absolute;
  z-index: 10;

  margin-top: -8.5rem;
  cursor: pointer;
`;

const VocalPorfolioBlur = styled.div<{ idx: number; vocalPortfolioClickBool: boolean }>`
  position: absolute;
  z-index: 3;

  width: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32.2 : 16.9)}rem;
  height: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32.2 : 16.9)}rem;

  margin-top: ${({ vocalPortfolioClickBool, idx }) => (idx !== 0 && !vocalPortfolioClickBool ? -8.5 : -12)}rem;
  margin-top: ${({ vocalPortfolioClickBool, idx }) => idx !== 0 && vocalPortfolioClickBool && -8.5}rem;

  border-radius: 3rem;

  transform: rotate(45deg);

  -webkit-backdrop-filter: blur(2rem);
  backdrop-filter: blur(2rem);
`;

const VocalPortfolioWrapper = styled.div<{
  idx: number;
  vocalPortfolioHoverBool: boolean;
  vocalPortfolioClickBool: boolean;
}>`
  display: inline-block;

  overflow: hidden;
  width: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;
  height: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 32 : 16.7)}rem;
  border-radius: 3rem;

  transform: rotate(-45deg);

  margin-bottom: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 12 : 8.5)}rem;
  margin-top: ${({ vocalPortfolioClickBool, idx }) => idx !== 0 && vocalPortfolioClickBool && 3.5}rem;

  box-shadow: 0 0 4rem
    ${({ vocalPortfolioHoverBool, vocalPortfolioClickBool, theme }) =>
      vocalPortfolioHoverBool && !vocalPortfolioClickBool && theme.colors.sub2};
`;

const VocalPortfolioImg = styled.img<{
  idx: number;
  vocalPortfolioHoverBool: boolean;
  vocalPortfolioClickBool: boolean;
}>`
  border-radius: 3rem;

  transform: rotate(45deg);
  object-fit: cover;

  position: relative;
  width: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 150 : 135)}%;
  height: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 150 : 135)}%;
  bottom: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 9 : 3)}rem;
  right: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 7.5 : 3)}rem;

  margin-bottom: ${({ vocalPortfolioClickBool, idx }) => (idx === 0 || vocalPortfolioClickBool ? 12 : 8.5)}rem;
  margin-top: ${({ vocalPortfolioClickBool, idx }) => idx !== 0 && vocalPortfolioClickBool && 3.5}rem;

  opacity: ${({ vocalPortfolioHoverBool, vocalPortfolioClickBool }) =>
    !vocalPortfolioHoverBool && !vocalPortfolioClickBool && 0.2};

  cursor: pointer;
`;
