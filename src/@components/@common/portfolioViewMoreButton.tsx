import styled, { keyframes } from "styled-components";
import { ProducerVocalSearchingArrowIc, ProducerVocalSearchingViewMoreTextIc } from "../../assets";

export default function PortfolioViewMoreButton() {
  return (
    <ViewMoreButtonWrapper>
      <ProducerVocalSearchingArrowIcon />
      <ProducerVocalSearchingViewMoreTextIcon />
    </ViewMoreButtonWrapper>
  );
}

const ViewMoreButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 30rem;
`;

const arrowSliding = keyframes`
    0% {
        margin-left:0;
    }
    100% {
        margin-left:2.5rem;
    }
`;
const ProducerVocalSearchingArrowIcon = styled(ProducerVocalSearchingArrowIc)`
  cursor: pointer;
  overflow: visible;

  &:hover {
    animation-name: ${arrowSliding};
    animation-duration: 0.5s;
    animation-duration: linear;
    animation-iteration-count: 2;
    animation-direction: alternate;
    animation-fill-mode: forwards;
  }
`;

const ProducerVocalSearchingViewMoreTextIcon = styled(ProducerVocalSearchingViewMoreTextIc)`
  cursor: pointer;
`;
