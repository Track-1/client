import styled from "styled-components";
import UploadInfoBox from "./UploadInfoBox";
import HashtagInput from "../@common/hashtag/hashtagInput";
import HashtagWarning from "../@common/hashtag/hashtagWarning";

export default function HashtagInfo() {
  return (
    <UploadInfoBox>
      <InfoType>
        #<InfoTypeText> Hashtag</InfoTypeText>
      </InfoType>
      <InfoInput>
        <HashtagInput />
        <CustomHashtagWarning>
          <HashtagWarning />
        </CustomHashtagWarning>
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

const CustomHashtagWarning = styled.div`
  margin-left: 16rem;
`;
