import styled from "styled-components";
import { UploadDescriptionIc } from "../../../../assets";
import UploadInfoBox from "./UploadInfoBox";
import TextareaAutosize from "react-textarea-autosize";
import { TEXT_LIMIT } from "../../../../core/common/textLimit";
import useInputText from "../../../../hooks/common/useInputText";
import TextLength from "./TextLength";
import { checkEnterCount } from "../../../../utils/common/checkEnterCount";
import useUploadInitValue from "../../../../hooks/upload/useUploadInitValue";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { UploadData } from "../../../../recoil/upload/uploadData";

export default function DescriptionInfo() {
  const [uploadInit] = useUploadInitValue();
  const [description, changeDescription] = useInputText(uploadInit.description, TEXT_LIMIT.DESCRIPTION);
  const setUploadData = useSetRecoilState(UploadData);

  useEffect(() => {
    setUploadData((prev) => ({
      ...prev,
      content: description,
    }));
  }, [description]);

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = checkEnterCount(e);
    enterCount < TEXT_LIMIT.ENTER_COUNT && changeDescription(e);
  }

  return (
    <UploadInfoBox>
      <InfoType>
        <UploadDescriptionIc />
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <InfoInput>
        <DescriptionText
          //따로 폴더를 만들어서 상수로 빼서 작업하기
          placeholder="트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요."
          spellCheck="false"
          maxRows={7}
          onChange={handleDescription}
          value={description}
        />
        <TextLengthWrapper>
          <Empty />
          <TextLength inputLength={description.length} limit={TEXT_LIMIT.DESCRIPTION} font={"description"} />
        </TextLengthWrapper>
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
`;

const DescriptionText = styled(TextareaAutosize)`
  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description};

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray5};

  margin-top: 1.7rem;
  padding-bottom: 1rem;

  overflow: hidden;

  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
    ${({ theme }) => theme.fonts.description};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.white};
  }

  resize: none;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
`;

const TextLengthWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1.8rem;
`;
