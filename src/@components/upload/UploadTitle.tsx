import styled from "styled-components";
import TextLength from "./TextLength";
import { TEXT_LIMIT } from "../../core/common/textLimit";

interface UploadTitleProps {
  title: string;
  changeTitle: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadTitle(props: UploadTitleProps) {
  const { title, changeTitle } = props;
  return (
    <Container>
      <Empty />
      <TitleInput
        placeholder="Please enter a title"
        spellCheck="false"
        onChange={changeTitle}
        defaultValue={title}></TitleInput>
      <TextLengthWrapper>
        <Empty />
        <TextLength inputLength={title.length} limit={TEXT_LIMIT.UPLOAD_TITLE} font={"body1"} />
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
