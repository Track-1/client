import styled from "styled-components";
import TextLength from "./textLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import { theme } from "../../style/theme";

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
      <TitleInput
        placeholder="Please enter a title"
        spellCheck="false"
        onChange={handleChangeInputTitle}
        value={title}
        defaultValue={title}></TitleInput>
      <TextLengthWrapper>
        <Empty />
        <TextLength inputLength={title.length} limit={TEXT_LIMIT.UPLOAD_TITLE} font={theme.fonts.body1} />
      </TextLengthWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 25rem;
`;

const Empty = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleInput = styled.textarea`
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

const TextLengthWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 1.8rem;
`;
