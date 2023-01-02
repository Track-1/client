import styled from "styled-components"

import { TrackListHeaderSloganIc, ProducerTextIc, VocalTextIc } from "../../assets"

export default function TrackListHeader() {
  return (
    <TrackListHeaderWrapper>
    <TrackListHeaderSloganIcon/>
    <StickerWrapper>
      <ProducerStickerWrapper>
        <ProducerTextIcon/>
      </ProducerStickerWrapper>

      <VocalTextIcon/>
      <VocalStickerBackground>
        <FirstSquare></FirstSquare>
        <SecondSquare></SecondSquare>
        <ThirdSquare></ThirdSquare>
      </VocalStickerBackground>
    </StickerWrapper>
    </TrackListHeaderWrapper>
  )
}

const TrackListHeaderWrapper=styled.section`
  width: 150.9rem;

  display:flex;
  justify-content: space-between;
  padding-top: 14.3rem;
`

const TrackListHeaderSloganIcon=styled(TrackListHeaderSloganIc)`
  margin: 2.64rem 0 0 9rem;
`

const StickerWrapper=styled.article`
  display:inline-block;

  width: 37.5rem;
  margin-top: 2.4rem;
`

const ProducerTextIcon=styled(ProducerTextIc)`
  position: absolute;
  z-index: 5;

`

const ProducerStickerWrapper=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  z-index: 4;

  width: 25.298rem;
  height: 6.143rem;
  margin-left: 1rem;

  background: ${({ theme }) => theme.colors.sub1};
  transform: rotate(14.99deg);

  border-radius: 10rem;
`

const VocalTextIcon=styled(VocalTextIc)`
  position: absolute;
  z-index: 3;

  margin: 5.5rem 0 0 23.5rem;

  transform: rotate(-15.03deg);
`

const VocalStickerBackground=styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 3.69rem;
  margin-left: 22.5rem;
`

const FirstSquare=styled.div`
  position: absolute;
  z-index: 1;

  margin-left: -2rem;
  margin-top: 2rem;

  width: 5rem;
  height: 5rem;

  background: linear-gradient(355deg, ${({ theme }) => theme.colors.sub2} -70%, transparent 75%);

  transform: rotate(-60.03deg);
  
  border-radius: 1.2rem;
`

const SecondSquare=styled.div`
  width: 12rem;
  height: 6.143rem;

  position: absolute;
  z-index: 2;

  background: linear-gradient(310deg, ${({ theme }) => theme.colors.sub2} 40%, ${({ theme }) => theme.colors.sub3} 90%);

  transform: rotate(-15.03deg);

  border-radius: 0.4rem;
`

const ThirdSquare=styled.div`
  position: absolute;
  z-index: 1;

  margin-left: 9rem;
  margin-top: -0.9rem;

  width: 5rem;
  height: 5rem;

  background: ${({ theme }) => theme.colors.sub2};
  transform: rotate(-60.03deg);

  border-radius: 1.2rem;
`