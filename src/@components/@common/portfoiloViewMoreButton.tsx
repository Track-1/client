import styled,{ keyframes} from "styled-components"
import {ProducerVocalSearchingArrowIc, ProducerVocalSearchingViewMoreTextIc} from "../../assets"

interface ClickEventPropsType{
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}


export default function PortfoiloViewMoreButton(props:ClickEventPropsType) {
    
  return (
    <ViewMoreButtonWrapper>
        <ProducerVocalSearchingArrowIcon/>
        <ProducerVocalSearchingViewMoreTextIcon/>
    </ViewMoreButtonWrapper>
  )
}

const ViewMoreButtonWrapper=styled.div`
    display: flex;
    flex-direction: column;
`

const arrowSliding=keyframes`
    0% {
        margin-left:0;
    }
    100% {
        margin-left:2.5rem;
    }
`
const ProducerVocalSearchingArrowIcon=styled(ProducerVocalSearchingArrowIc)`
    cursor: pointer;
    
    &:hover{
        animation-name: ${arrowSliding};
        animation-duration:0.5s;
        animation-duration: linear;
        animation-iteration-count:2;
        animation-direction:alternate;
        animation-fill-mode: forwards;
    }
`

const ProducerVocalSearchingViewMoreTextIcon=styled(ProducerVocalSearchingViewMoreTextIc)`
    cursor: pointer;
`
