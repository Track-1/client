import { useState } from "react";
import styled from "styled-components";
import { nameWarningMessage } from "../../core/common/warningMessage";
import { inputState } from "../../core/common/inputState";

interface PropsType {
  inputTitle: string;
  data: string;
  onChangeProps: (value: string) => void;
}

export default function ProfileTitleInput(props: PropsType) {
  const { inputTitle, data, onChangeProps } = props;
  const [nameState, setNameState] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const inputWrapperWidth = inputTitle === "name" ? "54.9rem" : "55.9rem";

  function checkNameIsError() {
    return nameState === inputState.ERROR;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.currentTarget.value.length);
    const newValue = event.target.value;
    onChangeProps(newValue);
  }

  const nameStateNothing = value === 0 ? inputState.NOTHING : inputState.CORRECT || inputState.ERROR;

  return (
    <>
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>{inputTitle}</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper nameState={nameState} width={inputWrapperWidth} nameStateNothing={nameStateNothing}>
          <NameInput placeholder="상수로 두기" onChange={handleChange} value={data} />
        </InputWrapper>
        {checkNameIsError() ? (
          <ProfileEditWarningMsg>{nameWarningMessage}</ProfileEditWarningMsg>
        ) : (
          <BlankMessage></BlankMessage>
        )}
      </NameContainer>
    </>
  );
}

const NameContainer = styled.article`
  width: 60rem;
  height: 8.8rem;

  margin: 6.3rem 0 0 6.4rem;
`;

const NameTitleWrapper = styled.div`
  display: flex;
`;

const NameTitleText = styled.strong`
  margin-right: 0.6rem;

  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.cations}
`;

const PointIcon = styled.div`
  width: 0.7rem;
  height: 0.7rem;

  background-color: ${({ theme }) => theme.colors.main};
`;

const InputWrapper = styled.div<{ nameState: string; width: string; nameStateNothing: string }>`
  display: flex;
  justify-content: space-between;

  width: ${({ width }) => width};
  margin-bottom: 0.5rem;

  border-bottom: 0.1rem solid
    ${({ nameStateNothing, nameState, theme }) =>
      nameStateNothing === "correct"
        ? theme.colors.main
        : nameState === "error"
        ? theme.colors.red
        : theme.colors.white};
`;

const ProfileEditWarningMsg = styled.span`
  width: 100%;
  height: 3rem;

  margin-top: 1.1rem;

  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.description};
`;

const NameInput = styled.input`
  width: 70%;
  height: 4.5rem;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.input}
`;

const BlankMessage = styled.p`
  width: 100%;
  height: 3rem;

  margin-bottom: 2rem;

  color: transparent;
`;
