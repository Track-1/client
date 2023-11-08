import styled from "styled-components";
import HashtagInput from "../@common/hashtag/hashtagInput";
import InputContainer from "../@common/inputContainer";

interface ProfileHashtagEditProps {
  getHashtags: (hashtags: string[]) => void;
}

export default function ProfileHashtagEdit(props: ProfileHashtagEditProps) {
  const { getHashtags } = props;

  return (
    <>
      <HashtagContainer>
        <InputContainer title="Hashtag" hashtagWarningIcon>
          <HashtagWrapper>
            <HashtagInput getHashtags={getHashtags} />
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
