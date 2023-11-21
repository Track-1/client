import styled from "styled-components";
import HashtagInput from "../@common/hashtag/hashtagInput";
import HashtagWarning from "../@common/hashtag/hashtagWarning";
import { InfoInput, InfoType, InfoTypeIconWrapper, InfoTypeText } from "./categotyInfo";
import UploadInfoBox from "./uploadInfoBox";

interface HashtagInfoProps {
  hashtags: string[];
  hashtagLength: number;
  hashtagInputText: string;
  handleAddHashtag: () => void;
  handleRemoveHashtag: (tag: string) => void;
  handleChangeHashtagInputText: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
}

export default function HashtagInfo(props: HashtagInfoProps) {
  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = props;

  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>#</InfoTypeIconWrapper>
        <InfoTypeText>Hashtag</InfoTypeText>
      </InfoType>

      <InfoInput>
        <HashtagInputWrapper>
          <HashtagInput
            hashtags={hashtags}
            hashtagLength={hashtagLength}
            hashtagInputText={hashtagInputText}
            handleAddHashtag={handleAddHashtag}
            handleRemoveHashtag={handleRemoveHashtag}
            handleChangeHashtagInputText={handleChangeHashtagInputText}
          />
        </HashtagInputWrapper>
        <HashtagWarning />
      </InfoInput>
    </UploadInfoBox>
  );
}

const HashtagInputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  width: 100%;
  height: 100%;
`;
