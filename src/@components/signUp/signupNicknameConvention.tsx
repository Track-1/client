import React, { useEffect, useRef, useState } from "react";
import {
  SignUpBackArrowIc,
  SignUpChangeImageIc,
  SignupCompleteBtnIc,
  SignUpContinueButtonIc,
  SignUpErrorIc,
  SignUpUploadImageIc,
  SignUpVerifyIc,
  WhatsYourNameTextIc,
} from "../../assets";
import { SetUserPropsType } from "../../type/signUpStepTypes";
import styled from "styled-components";
import { setInputUnderline, setMessageColor } from "../../utils/errorMessage/setInputStyle";
import { signUpStep } from "../../core/signUp/signupStepType";
import { nicknameValidMessage } from "../../core/userInfoErrorMessage/nicknameMessage";
import { checkNicknameForm } from "../../utils/errorMessage/checkNicknameForm";
import ConventionCheckBox from "./conventionCheckBox";
import { continueType } from "../../core/signUp/continueType";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserType } from "../../recoil/main";
import { useMutation, useQueryClient } from "react-query";
import { joinProducer, joinVocal } from "../../core/api/signUp";
import { isVocal, isProducer } from "../../utils/common/userType";
import ProfilImageContainer from "./profilImageContainer";
import { ConventionChecksType } from "../../type/conventionChecksType";
import { conventionSelectedCheck } from "../../core/signUp/conventionSelectedCheck";
import { setCookie } from "../../utils/cookie";
import { LoginUserId, LoginUserType } from "../../recoil/loginUserData";

export default function SignupNicknameConvention(props: SetUserPropsType) {
  const { setStep, setUserData, userData } = props;
  const [imageSrc, setImageSrc] = useState<string>("");
  const [isHover, setIsHover] = useState<boolean>(false);
  const [nickname, setNickname] = useState<string>("");
  const [nicknameMessage, setNicknameMessage] = useState<string>(nicknameValidMessage.NULL);
  const [completeCheck, setCompleteCheck] = useState<boolean>(false);
  const userType = useRecoilValue(UserType);
  const [successNextStep, setSuccessNextStep] = useState<string>(continueType.FAIL);
  const [checkedConventions, setCheckedConventions] = useState<ConventionChecksType[]>(conventionSelectedCheck);
  const [nextStep, setNextStep] = useState<string>(signUpStep.SIGNUP_NICKNAME_CONVENTION);
  const [isSave, setIsSave] = useState<boolean>(false);
  const setLoginUserType = useSetRecoilState(LoginUserType);
  const setLoginUserId = useSetRecoilState(LoginUserId);

  function checkImageHover() {
    setIsHover(!isHover);
  }

  function setErrorIcon(message: string) {
    switch (message) {
      case nicknameValidMessage.ERROR:
        return <SignUpErrorIcon />;
      case nicknameValidMessage.SUCCESS:
        return <SignUpVerifyIcon />;
      default:
        return;
    }
  }

  function moveBackToEmailPassword() {
    setUserData((prev) => ({ ...prev, ID: "", PW: "", isAgree: "", name:""}));
    setStep(signUpStep.SIGNUP_EMAIL_PASSWORD);
  }

  function completeNicknameConventions() {
    return nicknameMessage === nicknameValidMessage.SUCCESS && completeCheck&& userData.ID!==""&&userData.PW!==""&&userData.isAgree!==""&&userData.name!=="";
  }

  function writeNickname(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setNicknameMessage(nicknameValidMessage.NULL);
    } else if (!checkNicknameForm(e.target.value)) {
      setNicknameMessage(nicknameValidMessage.ERROR);
    } else if (checkNicknameForm(e.target.value)) {
      setNicknameMessage(nicknameValidMessage.SUCCESS);
    }

    setNickname(e.target.value);
  }

  function onSaveData() {
    completeNicknameConventions() && setIsSave(true);
  }
console.log(userData)
  // useEffect(()=>{
  //   setUserData((prev) => ({ ...prev, imageFile:imageSrc, name:nickname, isAgree:`${checkedConventions[3].selected}` }));
  // },[imageSrc, nickname, completeCheck])
  useEffect(() => {
    setUserData((prev) => ({ ...prev, name: nickname, isAgree: `${checkedConventions[3].selected}` }));
  }, [nickname, completeCheck]);

  useEffect(() => {
    completeNicknameConventions() ? setSuccessNextStep(continueType.SUCCESS) : setSuccessNextStep(continueType.FAIL);
  }, [nicknameMessage, completeCheck]);

  //upload userData
  const queryClient = useQueryClient();

  const { mutate: JoinProducer } = useMutation(joinProducer, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("join-producer");
      const accessToken = data.data.data.accessToken;
      setCookie("accessToken", accessToken, {}); //옵션줘야돼용~
      setStep(signUpStep.SIGNUP_PROFILE);
      setLoginUserType(data.data.data.userResult.tableName);
      setLoginUserId(data.data.data.userResult.id);
    },
    onError: () => {},
  });

  const { mutate: JoinVocal } = useMutation(joinVocal, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("join-vocal");
      const accessToken = data.data.data.accessToken;
      setCookie("accessToken", accessToken, {}); //옵션줘야돼용~
      setStep(signUpStep.SIGNUP_PROFILE);
      setLoginUserType(data.data.data.userResult.tableName);
      setLoginUserId(data.data.data.userResult.id);
    },
    onError: (error) => {
      setStep(signUpStep.SIGNUP_NICKNAME_CONVENTION);
    },
  });

  useEffect(() => {
    isVocal(userType) && JoinVocal(userData);
    isProducer(userType) && JoinProducer(userData);
  }, [isSave]);
  //user data post end

  function isNull(answer: string) {
    return answer === "";
  }

  return (
    <>
      <ProfilImageContainer
        imageSrc={imageSrc}
        checkImageHover={checkImageHover}
        isHover={isHover}
        setImageSrc={setImageSrc}
        setUserData={setUserData}
      />
      <NicknameWrapper>
        <WhatsYourNameTextIcon />
        <InputWrapper>
          <Input
            type="text"
            placeholder="Enter your user name"
            width={56}
            underline={setInputUnderline(nicknameMessage)}
            onChange={writeNickname}
          />
          {setErrorIcon(nicknameMessage) && (
            <IconWrapper marginLeft={-3.9}>{setErrorIcon(nicknameMessage)}</IconWrapper>
          )}
        </InputWrapper>
        <MessageWrapper textColor={setMessageColor(nicknameMessage)}>{nicknameMessage}</MessageWrapper>
      </NicknameWrapper>
      <ConventionCheckBox
        setCompleteCheck={setCompleteCheck}
        checkedConventions={checkedConventions}
        setCheckedConventions={setCheckedConventions}
        setUserData={setUserData}
      />
      <ArrowButtonWrapper>
        <SignUpBackArrowIcon onClick={moveBackToEmailPassword} />

        {/* <ContinueButton successNextStep={successNextStep} step={signUpStep.SIGNUP_PROFILE} setStep={setStep}/> */}
        <ContinueButtonWrapper type="button" isNotNull={!isNull(successNextStep)} onClick={onSaveData}>
          <SignupCompleteBtnIcon/>
        </ContinueButtonWrapper>
      </ArrowButtonWrapper>
    </>
  );
}
const ContinueButtonWrapper = styled.button<{ isNotNull: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 17rem;
  height: 4.6rem;

  border-radius: 2.5rem;
  border: 0.1rem solid ${({ theme, isNotNull }) => (isNotNull ? theme.colors.main : theme.colors.gray4)};
  background-color: ${({ theme, isNotNull }) => (isNotNull ? theme.colors.main : theme.colors.gray4)};
`;

const Input = styled.input<{ width: number; underline: string }>`
  display: flex;
  align-items: center;

  padding: 3rem 0 0.5rem 0;

  width: ${({ width }) => width}rem;

  border-bottom: 0.1rem solid ${({ underline }) => underline};

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray4};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MessageWrapper = styled.p<{ textColor: string }>`
  margin-top: 1.1rem;

  color: ${({ textColor }) => textColor};

  ${({ theme }) => theme.fonts.message};
`;

const IconWrapper = styled.div<{ marginLeft: number }>`
  margin: 2rem 0 0 ${({ marginLeft }) => marginLeft}rem;
`;

const SignUpBackArrowIcon = styled(SignUpBackArrowIc)`
  width: 10.5rem;
  cursor: pointer;
`;

const ArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 56rem;
  height: 4.6rem;

  margin: 3.7rem 0 0 10.8rem;
`;

const NicknameWrapper = styled.section`
  margin: 0rem 11rem;
`;

const WhatsYourNameTextIcon = styled(WhatsYourNameTextIc)`
  width: 21.2rem;
`;

const SignupCompleteBtnIcon = styled(SignupCompleteBtnIc)`
  width: 9.7rem;
`;

const SignUpErrorIcon = styled(SignUpErrorIc)`
  width: 4rem;
  height: 4rem;
`;

const SignUpVerifyIcon = styled(SignUpVerifyIc)`
  width: 4rem;
  height: 4rem;
`;
