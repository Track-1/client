import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ProfileEditActiveButtonIc,
  ProfileEditCheckIc,
  ProfileEditSleepAcountTextIc,
  ProfileEditSleepAcountTitleIc,
  ProfileEditWarningIc,
} from "../../assets";
import profileEditUploadDefaultImg from "../../assets/image/profileEditUploadDefaultImg.png";

interface PropsType {
  activeSaveButton: (inputState: string) => void;
}

export default function ProducerProfileEditTitle(props: PropsType) {
  const { activeSaveButton } = props;
  const NICK_NAME = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{1,20}$/;

  const [prevImage, setPrevImage] = useState<string | ArrayBuffer | null>();
  const [isUploaded, setIsUploaded] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<any>();
  const [inputState, setInputState] = useState<string>("nothing");

  useEffect(() => {
    activeSaveButton(inputState);
  }, [inputState]);

  function getFile(e: React.ChangeEvent<HTMLInputElement>) {
    setIsUploaded(true);
    e.target.files && setProfileImage(e.target.files[0]);
    showPrevImage(e);
  }

  function showPrevImage(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage = reader.result;
      resultImage && setPrevImage(resultImage);
    };
  }
  function checkInputName(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) return;

    NICK_NAME.test(e.target.value) ? setInputState("correct") : setInputState("error");
  }

  return (
    <TitleContainer>
      <ProfileImageContainer htmlFor="profileImg">
        {isUploaded ? <UploadedImage src={String(prevImage)} /> : <ProfileImage src={profileEditUploadDefaultImg} />}
      </ProfileImageContainer>
      <input type="file" id="profileImg" style={{ display: "none" }} onChange={getFile} />
      <NameContainer>
        <NameTitleWrapper>
          <NameTitleText>Name</NameTitleText>
          <PointIcon />
        </NameTitleWrapper>
        <InputWrapper inputState={inputState}>
          <NameInput onChange={checkInputName} />
          {inputState !== "nothing" && (inputState === "correct" ? <ProfileEditCheckIc /> : <ProfileEditWarningIc />)}
        </InputWrapper>
      </NameContainer>
    </TitleContainer>
  );
}

const TitleContainer = styled.section`
  height: 88.8rem;
  width: 67.7rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(#141517, #141517), linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImageContainer = styled.label`
  height: 36.8rem;
  width: 36.8rem;

  margin-top: 17.8rem;

  border-radius: 50%;
`;

const ProfileImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  border-radius: 50%;
`;

const UploadedImage = styled.img`
  height: 36.8rem;
  width: 36.8rem;

  border-radius: 50%;
  object-fit: cover;
`;

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

const InputWrapper = styled.div<{ inputState: string }>`
  width: 54.9rem;

  display: flex;
  justify-content: space-between;

  border-bottom: ${({ inputState, theme }) => {
    if (inputState === "nothing") return "0.1rem solid white";
    if (inputState === "correct") return "0.1rem solid #5200FF";
    if (inputState === "error") return "0.1rem solid  #FF4F4F";
  }};
`;

const NameInput = styled.input`
  height: 4.5rem;
  width: 70%;

  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.input}
`;
