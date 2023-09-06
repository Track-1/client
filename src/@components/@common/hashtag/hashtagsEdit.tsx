import styled from "styled-components";

import InputTitle from "../inputTitle";
import HashtagInput from "./hashtagInput";
import HashtagWarning from "./hashtagWarning";

export default function HashtagsEdit() {
  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <InputTitle>Hashtag</InputTitle>
          <HashtagWarning />
        </HashIconWrapper>
        <HashtagInput />
      </HashtagContainer>
    </>
  );
}

const HashtagContainer = styled.article`
  width: 55.9rem;
`;

const HashIconWrapper = styled.div`
  display: flex;
`;
