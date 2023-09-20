import styled from "styled-components";
import HashtagInput from "../@common/hashtag/hashtagInput";
import InputContainer from "../@common/inputContainer";

interface ProfileHashtagEditProps {
  hashtags: string[];
  hashtagLength: number;
  hashtagInputText: string;
  handleEnterHashtag: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleAddHashtag: () => void;
  handleRemoveHashtag: (tag: string) => void;
  handleChangeHashtagInputText: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function ProfileHashtagEdit(props: ProfileHashtagEditProps) {
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleEnterHashtag,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = props;

  return (
    <>
      <HashtagContainer>
        <InputContainer title="Hashtag" hashtagWarningIcon>
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
        </InputContainer>
      </HashtagContainer>
    </>
  );
}

const HashtagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  height: 100%;

  margin-bottom: 4.8rem;
`;

const HashtagContainer = styled.article`
  width: 55.9rem;

  margin-top: 4.8rem;
`;
