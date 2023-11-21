import styled from "styled-components";
import TextLength from "./textLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import TextareaAutosize from "react-textarea-autosize";
import { useFormContext } from "react-hook-form";

export default function UploadTitle() {
  const { register, watch } = useFormContext();

  return (
    <Container>
      <Empty />
      <TitleInputWrapper>
        <TitleInput
          placeholder="Please enter a title"
          spellCheck="false"
          maxLength={36}
          {...register("title", {
            required: true,
          })}></TitleInput>
        <TextLengthWrapper>
          <TextLength inputLength={watch("title").length} limit={TEXT_LIMIT.UPLOAD_TITLE} />
        </TextLengthWrapper>
      </TitleInputWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 25rem;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleInput = styled(TextareaAutosize)`
  width: 100%;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.title};

  border: none;
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray5};
  background-color: transparent;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }

  &:focus {
    outline: none;
  }

  resize: none;
`;

const TitleInputWrapper = styled.div`
  width: 100%;
`;

export const TextLengthWrapper = styled.div`
  ${({ theme }) => theme.fonts.body1}

  float: right;
  margin-top: 1.8rem;
`;
