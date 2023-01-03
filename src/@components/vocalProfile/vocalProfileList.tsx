import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components"
import vocals from "../../mocks/vocalProfileDummy.json"
import {showPlayerBar, playMusic,trackClicked,selectedId} from "../../recoil/player"
import { VocalProfileBlurPauseIc, VocalProfileBlurPlayIc } from "../../assets";

export default function VocalProfileList() {
  const vocalPortfolioCount=vocals.length;
  const [vocalPortfolioHover, setVocalPortfolioHover] = useState<number>(-1)
  const [vocalPortfolioClick, setVocalPortfolioClick]=useRecoilState<number>(selectedId)
  const [showPlayer, setShowPlayer]=useRecoilState<boolean>(showPlayerBar)
  const [play, setPlay]=useRecoilState<boolean>(playMusic)


  function mouseOverVocalPortfolio(id:number){
    setVocalPortfolioHover(id)
  }

  function mouseOutVocalPortfolio(){
    setVocalPortfolioHover(-1)
  }

  function clickVocalPortfolio(id:number){
    setVocalPortfolioClick(id)
    showPlayer?setPlay((prev)=>!prev):setPlay(true)
    setShowPlayer(true)
  }

  return (
    <VocalProfileListWrapper>
      <VocalsPortfolioWrapper>
        {vocals.map((vocal,idx)=>(
          <VocalPortfolio 
            key={vocal.vocalPortfolioId}
            onMouseEnter={()=>mouseOverVocalPortfolio(vocal.vocalPortfolioId)} 
            onMouseLeave={mouseOutVocalPortfolio}
            onClick={()=>clickVocalPortfolio(vocal.vocalPortfolioId)}
          >
              <VocalPortfolioTitle>
                {vocalPortfolioHover===vocal.vocalPortfolioId
                &&vocalPortfolioClick!==vocal.vocalPortfolioId
                &&vocal.title
                }
              </VocalPortfolioTitle>
            {play
              &&vocalPortfolioHover===vocal.vocalPortfolioId
              &&vocalPortfolioHover!==-1
              &&vocalPortfolioClick===vocal.vocalPortfolioId
              &&<VocalProfileBlurPlayIcon/>
            }
            {!play
              &&vocalPortfolioHover===vocal.vocalPortfolioId
              &&vocalPortfolioHover!==-1
              &&vocalPortfolioClick===vocal.vocalPortfolioId
              &&<VocalProfileBlurPauseIcon/>
            }
            {vocalPortfolioHover===vocal.vocalPortfolioId
              &&vocalPortfolioHover!==-1
              &&vocalPortfolioClick===vocal.vocalPortfolioId
              &&<VocalPorfolioBlur idx={idx} />
            }
            <VocalPortfolioImg 
              src={require('../../assets/image/'+ vocal.jacketImage + '.png')} 
              alt="보컬 포트폴리오이미지" 
              idx={idx}   
              vocalPortfolioHoverBool={vocalPortfolioHover===vocal.vocalPortfolioId}
              vocalPortfolioClickBool={vocalPortfolioClick===vocal.vocalPortfolioId}
            />
          </VocalPortfolio>
        ))}
      </VocalsPortfolioWrapper>

      <VocalsBoxWrapper>
        <VocalsBoxBody vocalPortfolioCount={vocalPortfolioCount}></VocalsBoxBody>
        <VocalsBoxHead></VocalsBoxHead>
      </VocalsBoxWrapper>
    </VocalProfileListWrapper>
  )
}

const VocalProfileListWrapper=styled.section`
  position: absolute;
  z-index: 5;

  width: 132rem;
`

const VocalsBoxWrapper=styled.section`
`

const VocalsBoxHead=styled.div`
  width: 35.5rem;
  height: 35.45rem;
  margin: 33rem 0 0 35.4rem;    

  transform: rotate(45deg);

  border: 0.34rem solid ${({ theme }) => theme.colors.sub2};
  border-radius: 5.5rem 3rem 5.4rem 3rem;
`

const VocalsBoxBody=styled.div<{vocalPortfolioCount:number}>`
  position: absolute;
  z-index: 3;

  width: 47.7rem;
  height: ${({vocalPortfolioCount}) => vocalPortfolioCount*26}rem;

  margin-left: 29.3rem;
  margin-top: 18rem;

  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),  
  linear-gradient(to top, ${({ theme }) => theme.colors.sub3} -5%,  ${({ theme }) => theme.colors.sub2} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`

const VocalsPortfolioWrapper=styled.section`
  position: absolute;
  z-index: 4;
  margin: 38.5rem 0 0 38.5rem;
  padding-top: -38.5rem;
`

const VocalPortfolio=styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const VocalPortfolioTitle=styled.div`
  position: absolute;
  z-index: 5;

  width: 14rem;
  height: 5rem;
  margin-top: -5.5rem;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;

  ${({ theme })=>theme.fonts.id};
  color: ${({ theme })=>theme.colors.white};

  cursor: pointer;
`

const VocalProfileBlurPlayIcon=styled(VocalProfileBlurPlayIc)`
  position: absolute;
  z-index: 4;

  margin-top: -8.5rem;
`

const VocalProfileBlurPauseIcon=styled(VocalProfileBlurPauseIc)`
  position: absolute;
  z-index: 4;

  margin-top: -8.5rem;
`

const VocalPorfolioBlur=styled.div<{idx:number}>`
  position: absolute;
  z-index: 3;

  width:30.2rem;
  height:30.2rem;  
  margin-top: -12rem;
  margin-top: ${({idx})=>idx!==0?-8.5:-12}rem;

  border-radius: 3rem;

  transform: rotate(45deg);

  -webkit-backdrop-filter: blur(7rem);
  backdrop-filter: blur(7rem);
`

const VocalPortfolioImg=styled.img<{idx:number, vocalPortfolioHoverBool:boolean, vocalPortfolioClickBool:boolean}>`
  width: ${({vocalPortfolioClickBool,idx}) => idx===0||vocalPortfolioClickBool?(30.2):(16.7)}rem;
  height: ${({vocalPortfolioClickBool,idx}) => idx===0||vocalPortfolioClickBool?(30.2):(16.7)}rem;
  border-radius: 3rem;

  transform: rotate(45deg);

  margin-bottom: ${({vocalPortfolioClickBool,idx}) => idx===0||vocalPortfolioClickBool?(12):(8.5)}rem;
  margin-top: ${({vocalPortfolioClickBool,idx})=>idx!==0&&vocalPortfolioClickBool&&3.5}rem;

  box-shadow: 0 0 4rem  ${({ vocalPortfolioHoverBool, vocalPortfolioClickBool, theme }) => vocalPortfolioHoverBool&&!vocalPortfolioClickBool&&theme.colors.sub2};
  
  cursor: pointer;
`
