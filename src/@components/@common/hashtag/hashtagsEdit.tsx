import styled from "styled-components";

import HashtagWarning from "./hashtagWarning";
import HashtagInput from "./hashtagInput";

export default function HashtagsEdit() {
  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitle>Hashtag</HashtagTitle>
          <HashtagWarning />
        </HashIconWrapper>
        <HashtagInput />
      </HashtagContainer>
    </>
  );
}

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;

const HashIconWrapper = styled.div`
  display: flex;
`;

const HashtagTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.inputTitle};
`;
