import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useFormContext } from "react-hook-form";
import TextLength from "../upload/textLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";

interface DescriptionInputProps {
  maxLength: typeof TEXT_LIMIT[keyof typeof TEXT_LIMIT];
}

export function DescriptionInput(props: DescriptionInputProps) {
  const { maxLength } = props;
  const { register, watch } = useFormContext();
  return (
    <DescriptionInputWrapper>
      <DescriptionText
        placeholder="트랙 느낌과 작업 목표 등 트랙에 대해서 자세히 설명해주세요."
        spellCheck="false"
        maxRows={7}
        maxLength={maxLength}
        {...register("description")}
      />
      <TextLengthWrapper>
        <TextLength inputLength={watch("description").length} limit={maxLength} />
      </TextLengthWrapper>
    </DescriptionInputWrapper>
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
  margin-top: 4.5rem;
`;

const TextLengthWrapper = styled.div`
  ${({ theme }) => theme.fonts.description};

  float: right;
  margin-top: 1.8rem;
`;
