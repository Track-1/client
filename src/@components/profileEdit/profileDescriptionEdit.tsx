import styled from "styled-components";
import InputContainer from "../@common/inputContainer";
import TextareaAutosize from "react-textarea-autosize";
import { InfoInput } from "../upload/categotyInfo";
import TextLength from "../upload/textLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { checkEnterCount } from "../../utils/common/checkEnterCount";

interface ProfileDescriptionEditProps {
  description: string;
  handleChangeDescription: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileDescriptionEdit(props: ProfileDescriptionEditProps) {
  const { description, handleChangeDescription } = props;

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const enterCount = checkEnterCount(e);
    enterCount < TEXT_LIMIT.ENTER_COUNT && handleChangeDescription(e);
  }

  return (
    <InputContainer title="Description">
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
            <TextLength inputLength={description.length} limit={TEXT_LIMIT.PROFILE_DESCRIPTION} />
          </TextLengthWrapper>
        </DescriptionInputWrapper>
      </InfoInput>
    </InputContainer>
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
  outline: none;
  word-wrap: break-word;
  word-break: break-word;
  background: transparent;
  border-top: transparent;
  border-left: transparent;
  border-right: transparent;

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
  ${({ theme }) => theme.fonts.description};

  float: right;
  margin-top: 1.8rem;
`;
