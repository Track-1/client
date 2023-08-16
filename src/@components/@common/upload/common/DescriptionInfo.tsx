import { useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { UploadDescriptionIc } from "../../../../assets";
import UploadInfoBox from "./UploadInfoBox";
import DescriptionInput from "./DescriptionInput";
import { TEXT_LIMIT } from "../../../../core/common/textLimit";
import useInputText from "../../../../hooks/common/useInputText";
import useUploadInitValue from "../../../../hooks/upload/useUploadInitValue";
import { UploadData } from "../../../../recoil/upload/uploadData";
import { checkEnterCount } from "../../../../utils/common/checkEnterCount";
import TextLength from "./TextLength";


export default function DescriptionInfo() {
  return (
    <UploadInfoBox>
      <InfoType>
        <UploadDescriptionIc />
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <DescriptionInput />
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
