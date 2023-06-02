import styled from "styled-components";
import TextLength from "../@common/textLength";
import { theme } from "../../style/theme";
import useInputText from "../../hooks/common/useInputText";
import { TEXT_LIMIT } from "../../core/common/textLimit";

export default function UploadTitle() {
  const [titleInput, changeTitleInput] = useInputText("", TEXT_LIMIT[36]);

  return (
    <Container>
      <Empty />
      <TitleInput
        placeholder="Please enter a title"
        spellCheck="false"
        onChange={changeTitleInput}
        value={titleInput}></TitleInput>
      <TextLengthWrapper>
        <Empty />
        <TextLength inputLength={titleInput.length} limit={TEXT_LIMIT[36]} font={theme.fonts.body1} />
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
