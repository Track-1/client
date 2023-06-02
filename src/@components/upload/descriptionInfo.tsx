import styled from "styled-components";
import { UploadDescriptionIc } from "../../assets";
import UploadInfoBox from "./UploadInfoBox";
import Description from "./description";
import TextareaAutosize from "react-textarea-autosize";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { theme } from "../../style/theme";
import useInputText from "../../hooks/common/useInputText";
import TextLength from "../@common/textLength";

export default function DescriptionInfo() {
  const [dsecription, changeDescription] = useInputText("", TEXT_LIMIT[250]);

  function checkEnterCount(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = e.target.value.split("\n").length;
    enterCount < 8 && changeDescription(e);
  }

  return (
    <UploadInfoBox>
      <InfoType>
        <UploadDescriptionIc />
        <InfoTypeText>Description</InfoTypeText>
      </InfoType>
      <InfoInput>
        <DescriptionTest
          placeholder="트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요."
          spellCheck="false"
          maxRows={7}
          onChange={checkEnterCount}
          value={dsecription}
        />
        <TextLengthWrapper>
          <Empty />
          <TextLength inputLength={dsecription.length} limit={TEXT_LIMIT[250]} font={theme.fonts.description} />
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

const InfoTypeText = styled.div`
  margin-left: 1rem;
`;

const InfoInput = styled.div`
  width: 100%;
  height: 100%;
`;

const DescriptionTest = styled(TextareaAutosize)`
  width: 100%;
  /* height :  */

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description};

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray5};

  margin-top: 1.7rem;
  padding-bottom: 1rem;

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
