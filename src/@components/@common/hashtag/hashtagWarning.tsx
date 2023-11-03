import styled from "styled-components";
import { HashtagWarningIc } from "../../../assets";
import { hashtagInfo } from "../../../core/common/hashtagInfo";

export default function HashtagWarning() {
  return (
    <Container>
      <WarningIcon>
        <HashtagWarningIcon />
        <WarningTextWrapper>
          <WarningText>{hashtagInfo}</WarningText>
        </WarningTextWrapper>
      </WarningIcon>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const WarningTextWrapper = styled.div`
  display: none;

  position: absolute;
  right: 0;

  width: 47.2rem;
  height: 12.5rem;

  margin-top: 1.8rem;

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
  cursor: pointer;

  :hover ${WarningTextWrapper} {
    display: block;
  }
`;

const HashtagWarningIcon = styled(HashtagWarningIc)`
  width: 3rem;

  opacity: 0.3;

  :hover {
    opacity: 1;
  }
`;
