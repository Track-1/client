import styled from "styled-components";

import TextareaAutosize from "react-textarea-autosize";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { theme } from "../../style/theme";
import { checkEnterCount } from "../../utils/common/checkEnterCount";
import { InfoInput } from "./categotyInfo";
import TextLength from "./textLength";

interface DescriptionInputProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  isProfile: boolean;
}

export default function DescriptionInput(props: DescriptionInputProps) {
  const { description, handleChangeDescription, isProfile } = props;

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = checkEnterCount(e);
    enterCount < TEXT_LIMIT.ENTER_COUNT && handleChangeDescription(e);
  }

  return (
    <InfoInput>
      <DescriptionInputWrapper>
        <DescriptionText
          placeholder="트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요."
          spellCheck="false"
          maxRows={7}
          onChange={handleDescription}
          value={description}
        />
        <TextLengthWrapper>
          <TextLength
            inputLength={description.length}
            limit={isProfile ? TEXT_LIMIT.PROFILE_DESCRIPTION : TEXT_LIMIT.DESCRIPTION}
            font={theme.fonts.description}
          />
        </TextLengthWrapper>
      </DescriptionInputWrapper>
    </InfoInput>
  );
}

const DescriptionText = styled(TextareaAutosize)`
  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.description};

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray2};

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

const DescriptionInputWrapper = styled.div`
  width: 100%;
`;

export const TextLengthWrapper = styled.div`
  float: right;
  margin-top: 1.8rem;
`;
