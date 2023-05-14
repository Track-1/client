import { useState } from "react";
import styled from "styled-components";
import { nameWarningMessage } from "../../core/common/warningMessage";

export const nickName: { [key: string]: string } = {
  NOTHING: "nothing",
  CORRECT: "correct",
  ERROR: "error",
};

export default function TitleInputEdit() {
  const [nameState, setNameState] = useState<string>(nickName.NOTHING);

  return (
    <>
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper nameState={nameState}></InputWrapper>
        {nameState === nickName.ERROR ? (
          <ProfileEditWarningMsg>{nameWarningMessage}</ProfileEditWarningMsg>
        ) : (
          <BlankMessage></BlankMessage>
        )}
      </NameContainer>
    </>
  );
}

const NameContainer = styled.article`
  height: 8.8rem;
  width: 60rem;

  margin: 7.6rem 0 0 6.4rem;
`;

const NameTitleWrapper = styled.div`
  display: flex;
`;

const NameTitleText = styled.strong`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.cations}

  margin-right: 0.6rem;
`;

const PointIcon = styled.div`
  height: 0.7rem;
  width: 0.7rem;

  background-color: ${({ theme }) => theme.colors.main};
`;

const InputWrapper = styled.div<{ nameState: string }>`
  width: 54.9rem;

  display: flex;
  justify-content: space-between;

  margin-bottom: 0.5rem;

  border-bottom: ${({ nameState }) => {
    if (nameState === "nothing") return "0.1rem solid white";
    if (nameState === "correct") return "0.1rem solid #5200FF";
    if (nameState === "error") return "0.1rem solid  #FF4F4F";
  }};
`;

const ProfileEditWarningMsg = styled.span`
  width: 100%;
  height: 3rem;
  ${({ theme }) => theme.fonts.description};
  color: ${({ theme }) => theme.colors.red};

  margin-top: 1.1rem;
`;

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  margin-top: 1rem;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;

const BlankMessage = styled.p`
  width: 100%;
  height: 3rem;

  color: transparent;
  margin-bottom: 2rem;
`;
