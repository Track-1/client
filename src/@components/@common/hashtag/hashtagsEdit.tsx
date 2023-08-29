import styled from "styled-components";

import HashtagWarning from "./hashtagWarning";
import HashtagInput from "./hashtagInput";
import useHashtagInput from "../../../hooks/common/useHashtagInput";

export default function HashtagsEdit() {
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();

  return (
    <>
      <HashtagContainer>
        <HashIconWrapper>
          <HashtagTitle>Hashtag</HashtagTitle>
          <HashtagWarning />
        </HashIconWrapper>
        <HashtagWrapper>
          <HashtagInput
            hashtags={hashtags}
            hashtagLength={hashtagLength}
            hashtagInputText={hashtagInputText}
            handleEnterHashtag={handleEnterHashtag}
            handleAddHashtag={handleAddHashtag}
            handleRemoveHashtag={handleRemoveHashtag}
            handleChangeHashtagInputText={handleChangeHashtagInputText}
          />
        </HashtagWrapper>
      </HashtagContainer>
    </>
  );
}

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  height: 100%;

  align-items: center;
`;

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
