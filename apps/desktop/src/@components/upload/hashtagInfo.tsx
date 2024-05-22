import styled from "styled-components";
import HashtagInput from "../@common/hashtag/hashtagInput";
import UploadInfoBox from "./uploadInfoBox";

export default function HashtagInfo() {
  return (
    <UploadInfoBox>
      <InfoType>
        <InfoTypeIconWrapper>#</InfoTypeIconWrapper>
        <p>Hashtag</p>
      </InfoType>
      <InfoInput>
        <HashtagInput />
      </InfoInput>
    </UploadInfoBox>
  );
}

const InfoType = styled.div`
  display: flex;
  align-items: center;

  width: 27.4rem;
  height: 100%;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.cations};
`;

const InfoTypeIconWrapper = styled.div`
  width: 2.23rem;
`;

const InfoInput = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 100%;
`;
