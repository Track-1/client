import styled from "styled-components";
import { HashtagWarningIc } from "../../assets";
import { hashtagInfo } from "../../core/common/hashtagInfo";

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
  height: 12.5rem;
  width: 47.2rem;

  position: absolute;

  margin-top: 4rem;
  background: rgba(30, 32, 37, 0.7);
  backdrop-filter: blur(0.3rem);
  border-radius: 0.5rem;

  display: none;
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
  position: relative;

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
