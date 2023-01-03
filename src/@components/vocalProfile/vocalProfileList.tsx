import styled from "styled-components"
import vocals from "../../mocks/vocalProfileDummy.json"

export default function VocalProfileList() {
  const vocalPortfolioCount=vocals.length;

  return (
    <VocalProfileListWrapper>
      <VocalsPortfolioWrapper>
        {vocals.map(({vocalPortfolioId,jacketImage,title},idx)=>(
          <VocalPortfolio>
            <VocalPortfolioImg src={require('../../assets/image/'+ jacketImage + '.png')} alt="보컬 포트폴리오이미지"/>
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
  height: ${({vocalPortfolioCount}) => vocalPortfolioCount*50}rem;

  margin-left: 29.3rem;
  margin-top: 18rem;

  border-left: 0.3rem solid transparent;
  border-right: 0.3rem solid transparent;

  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),  
  linear-gradient(to top, ${({ theme }) => theme.colors.sub3} 0%, ${({ theme }) => theme.colors.sub3} 20%,  ${({ theme }) => theme.colors.sub2} 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

`

const VocalsPortfolioWrapper=styled.section`
  position: absolute;
  z-index: 4;
  margin: 38.5rem 0 0 38.5rem;
`

const VocalPortfolio=styled.article`
  margin-bottom: 17rem;
`

const VocalPortfolioImg=styled.img`
  width: 29.2rem;
  height: 29.2rem;
  border-radius: 3rem;

  transform: rotate(45deg);
`
