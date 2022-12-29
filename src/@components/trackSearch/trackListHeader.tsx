import styled from "styled-components"

import { TrackListHeaderSloganIc, ProducerTextIc, VocalTextIc } from "../../assets"

export default function TrackListHeader() {
  return (
    <TrackListHeaderWrapper>
    <SloganIc/>
    <StickerWrapper>
      <ProducerStickerWrapper>
        <ProducerSticker/>
      </ProducerStickerWrapper>
      
      <VocalTextIc/>
      <VocalStickerBackground>
        <div></div>
        <div></div>
        <div></div>
      </VocalStickerBackground>
    </StickerWrapper>
    </TrackListHeaderWrapper>
  )
}

const TrackListHeaderWrapper=styled.section`
  width: 150.9rem;

  display:flex;
  justify-content: space-between;
`

const SloganIc=styled(TrackListHeaderSloganIc)`
  margin: 2.64rem 0 0 9.46rem;
`

const StickerWrapper=styled.article`
  display:flex;
  justify-content: space-between;

  width: 37.5rem;
`

const ProducerSticker=styled(ProducerTextIc)`
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

  background: ${({ theme }) => theme.colors.sub1};
  transform: rotate(14.99deg);

  border-radius: 10rem;
`

const VocalStickerBackground=styled.div`
  & > div:nth-child(1){
    position: absolute;
    z-index: 2;

    width: 4.5rem;
    height: 4.5rem;

    background: linear-gradient(281.42deg, ${({ theme }) => theme.colors.sub2} 41.04%, rgba(233, 101, 255, 0) 85.02%);
    transform: rotate(-60.03deg);
    
    border-radius: 0.7rem;
  }

  & > div:nth-child(2){
    width: 17.618rem;
    height: 6.143rem;

    background: linear-gradient(281.42deg, ${({ theme }) => theme.colors.sub2} 41.04%, rgba(233, 101, 255, 0) 85.02%);
    transform: rotate(-15.03deg);
  }

  & > div:nth-child(3){
    position: absolute;
    z-index: 2;

    width: 4.5rem;
    height: 4.5rem;

    background: ${({ theme }) => theme.colors.sub2};
    transform: rotate(-60.03deg);

    border-radius: 0.7rem;

  }
`