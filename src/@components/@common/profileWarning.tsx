import React from 'react'
import styled from 'styled-components';
import { HashtagWarningIc, HoverHashtagWarningIc } from '../../assets';
import useHover from "../../utils/hooks/useHover";

export default function profileWarning() {
    const { hoverState, changeHoverState } = useHover();

  return (
    <WarningIcon onMouseEnter={(e) => changeHoverState(e)} onMouseLeave={(e) => changeHoverState(e)}>
    {hoverState ? (
      <>
        <HoverHashtagWarningIc />
        <WarningTextWrapper>
          <WarningText>
            1. 해시태그는 최대 3개까지 추가 가능합니다.
            <br />
            2. 최대 10자까지 작성이 가능합니다.
            <br />
            3. 트랙의 분위기에 대해 설명해주세요. (ex. tropical, dynamic)
          </WarningText>
        </WarningTextWrapper>
      </>
    ) : (
      <HashtagWarningIc />
    )}
  </WarningIcon>
  )
}

const WarningTextWrapper = styled.div`
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  top: 61.2rem;
  left: 128.4rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(3px);
  border-radius: 5px;
`;

const WarningText = styled.div`
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.gray2};

  margin: 1.9rem 1.8rem 0.4rem 2.9rem;
`;

const WarningIcon = styled.div`
  height: 3rem;
  margin-top: 0.7rem;
  border-radius: 5rem;

  cursor: pointer;
`;