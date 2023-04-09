import styled, { css, keyframes } from "styled-components";
import { ProducerVocalSearchingArrowIc, ProducerVocalSearchingViewMoreTextIc } from "../../assets";
import { useState } from "react";

export default function PortfolioViewMoreButton() {
  const [ishoverd, setIshoverd] = useState<boolean>(false);

  function checkViewMoreHover() {
    ishoverd ? setIshoverd(false) : setIshoverd(true);
  }

  return (
    <ViewMoreButtonWrapper onMouseEnter={checkViewMoreHover} onMouseLeave={checkViewMoreHover}>
      <ProducerVocalSearchingArrowIcon ishoverd={ishoverd} />
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
const ProducerVocalSearchingArrowIcon = styled(ProducerVocalSearchingArrowIc)<{ ishoverd: boolean }>`
  cursor: pointer;
  overflow: visible;
  width: 19.9rem;

  ${({ ishoverd }) =>
    ishoverd &&
    css`
      animation-name: ${arrowSliding};
      animation-duration: 0.5s;
      animation-duration: linear;
      animation-iteration-count: 2;
      animation-direction: alternate;
      animation-fill-mode: forwards;
    `}
`;

const ProducerVocalSearchingViewMoreTextIcon = styled(ProducerVocalSearchingViewMoreTextIc)`
  width: 13.8rem;
  cursor: pointer;
`;
