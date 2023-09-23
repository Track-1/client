import styled from "styled-components";
import HashtagInput from "../@common/hashtag/hashtagInput";
import HashtagWarning from "../@common/hashtag/hashtagWarning";
import UploadInfoBox from "./uploadInfoBox";

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
        #<InfoTypeText> Hashtag</InfoTypeText>
      </InfoType>

      <InfoInput>
        <HashtagInput
          hashtags={hashtags}
          hashtagLength={hashtagLength}
          hashtagInputText={hashtagInputText}
          handleEnterHashtag={handleEnterHashtag}
          handleAddHashtag={handleAddHashtag}
          handleRemoveHashtag={handleRemoveHashtag}
          handleChangeHashtagInputText={handleChangeHashtagInputText}
        />
        <HashtagWarning />
      </InfoInput>
    </UploadInfoBox>
  );
}

const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 20.7rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body1};
`;

const InfoTypeText = styled.p`
  margin-left: 1rem;
`;

const InfoInput = styled.div`
  width: 100%;
  height: 100%;

  margin-top: 0.3rem;

  display: flex;
  align-items: center;
`;
