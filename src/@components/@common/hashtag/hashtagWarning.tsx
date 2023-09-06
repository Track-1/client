import styled from "styled-components";
import { HashtagWarningIc } from "../../../assets";
import { hashtagInfo } from "../../../core/common/hashtagInfo";

export default function ProfileWarning() {
  return (
    <WarningIcon>
      <HashtagWarningIcon />
      <WarningTextWrapper>
        <WarningText>{hashtagInfo}</WarningText>
      </WarningTextWrapper>
    </WarningIcon>
  );
}

const WarningTextWrapper = styled.div`
  display: none;

  position: absolute;

  width: 47.2rem;
  height: 12.5rem;

  margin-top: 4rem;

  border-radius: 0.5rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.3rem);
`;

const WarningText = styled.div`
  margin: 1.9rem 1.8rem 0.4rem 2.9rem;

  white-space: pre-line;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.description};
`;

const WarningIcon = styled.div`
  position: relative;

  height: 3rem;
  margin-top: 3.9rem;

  border-radius: 5rem;

  cursor: pointer;

  :hover ${WarningTextWrapper} {
    display: block;
  }
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  position: absolute;
  z-index: 1;

  width: 4rem;
  height: 4rem;

  margin-left: 42.6rem;
  margin-top: -1rem;

  opacity: 0.3;

  :hover {
    opacity: 1;
  }
`;
