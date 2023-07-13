import styled from "styled-components";

import { HashtagTitleIc } from "../../../assets";
import HashtagWarning from "./hashtagWarning";
import HashtagInput from "./hashtagInput";

export default function HashtagsEdit() {
  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitleIcon />
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

const HashtagTitleIcon = styled(HashtagTitleIc)`
  width: 9.3rem;
`;
