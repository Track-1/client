import styled from "styled-components";
import TextLength from "./textLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { theme } from "../../style/theme";
import { TextLengthWrapper } from "./descriptionInput";
import TextareaAutosize from "react-textarea-autosize";

interface UploadTitleProps {
  title: string;
  handleChangeTitle: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadTitle(props: UploadTitleProps) {
  const { title, handleChangeTitle } = props;

  function handleChangeInputTitle(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.target.value = e.target.value.replace("\n", "");
    handleChangeTitle(e);
  }

  return (
    <Container>
      <Empty />
      <TitleInputWrapper>
        <TitleInput
          placeholder="Please enter a title"
          spellCheck="false"
          onChange={handleChangeInputTitle}
          value={title}
          defaultValue={title}></TitleInput>
        <TextLengthWrapper>
          <TextLength inputLength={title.length} limit={TEXT_LIMIT.UPLOAD_TITLE} font={theme.fonts.body1} />
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

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray5};

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.white};
  }

  resize: none;
`;

const TitleInputWrapper = styled.div`
  width: 100%;
`;
