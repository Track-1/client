import styled from "styled-components";
import UploadInfoBox from "./uploadInfoBox";
import HashtagInput from "../@common/hashtag/hashtagInput";
import HashtagWarning from "../@common/hashtag/hashtagWarning";
import { InfoInput, InfoType, InfoTypeText } from "./categotyInfo";

interface HashtagInfoProps {
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

export default function HashtagInfo(props: HashtagInfoProps) {
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
    <UploadInfoBox>
      <InfoType>
        #<InfoTypeText>Hashtag</InfoTypeText>
      </InfoType>

      <InfoInput>
        <HashtagInputWrapper>
          <HashtagInput
            hashtags={hashtags}
            hashtagLength={hashtagLength}
            hashtagInputText={hashtagInputText}
            handleEnterHashtag={handleEnterHashtag}
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

  width: 100%;
  height: 100%;
`;
