import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { SignBgLogoIc, SignupProfileCompleteIc, SignUpSkipButtonIc, SignWelcomeIc } from "../../assets";
import { patchProfile } from "../../core/api/trackPost";
import { signUpStep } from "../../core/signUp/signupStepType";
import { SignupMessagePropsType } from "../../type/signUpStepTypes";
import { isMessageLogo, isMessageWelcome } from "../../utils/signUp/checkMessageType";
import { useState } from "react";

export default function SignupMessage(props: SignupMessagePropsType) {
  const { step, setStep, userProfile, setUserProfile } = props;
  const [isComplete, setIsComplete] = useState<boolean>(false);

  function moveToSuccess() {
    setStep(signUpStep.SIGNUP_SUCCESS);
  }

  const queryClient = useQueryClient();

  const { mutate } = useMutation(patchProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("userProfile");
      setStep(signUpStep.SIGNUP_SUCCESS);
    },
    onError: () => {},
  });

  function submit() {
    mutate(userProfile);
  }

  useEffect(() => {
    if (
      userProfile.contact === "" &&
      userProfile.category.length === 0 &&
      userProfile.introduce === "" &&
      userProfile.keyword.length === 0
    ) {
      setIsComplete(false);
    } else {
      setIsComplete(true);
    }
  }, [userProfile]);

  return (
    <>
      {isMessageLogo(step) && <SignBgLogoIcon />}
      {isMessageWelcome(step) && (
        <WelcomeMessageWrapper>
          <SignUpSkipButtonIcon onClick={moveToSuccess} />
          <SignWelcomeIcon />
          <MessageBox isComplete={isComplete} onClick={submit}>
            <SignupProfileCompleteIcon />
          </MessageBox>
        </WelcomeMessageWrapper>
      )}
    </>
  );
}

const SignBgLogoIcon = styled(SignBgLogoIc)`
  margin: 43.5rem 24.9rem 0 23.3rem;

  width: 47.8rem;
`;

const SignWelcomeIcon = styled(SignWelcomeIc)`
  margin: 1.2rem 28.2rem 0 32.7rem;

  width: 35.1rem;
`;

const WelcomeMessageWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const SignUpSkipButtonIcon = styled(SignUpSkipButtonIc)`
  margin: 27.5rem 0 0 47.7rem;
  width: 27rem;
  cursor: pointer;
`;

const MessageBox = styled.button<{ isComplete: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 35.2rem;
  height: 7rem;
  margin: 4rem 0 0 32rem;

  cursor: pointer;

  border: 0.1rem solid transparent;
  border-radius: 3.5rem;
  background-color: ${({ theme, isComplete }) => (isComplete ? theme.colors.main : theme.colors.gray3)};
`;

const SignupProfileCompleteIcon=styled(SignupProfileCompleteIc)`
  width: 19rem;
`