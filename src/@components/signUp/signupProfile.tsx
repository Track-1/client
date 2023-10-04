import Footer from "../@common/footer";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignupProfileCompleteTextIc, SignupProfileSkipIc } from "../../assets";
import background from "../../assets/icon/signupProfileBackgroundIc.svg";
import { TEXT_LIMIT } from "../../core/common/textLimit";
import useHashtagInput from "../../hooks/common/useHashtagInput";
import useInputText from "../../hooks/common/useInputText";
import useSelectCategory from "../../hooks/producerProfileEdit/useSelectCategories";
import { useProfileAfterJoin } from "../../hooks/queries/user";
import ProfileContactEdit from "../profileEdit/profileContactEdit";
import ProfileDescriptionEdit from "../profileEdit/profileDescriptionEdit";
import ProfileHashtagEdit from "../profileEdit/profileHashtagEdit";
import ProfileSelectCategoryEdit from "../profileEdit/profileSelectCategoryEdit";
import SignUpBackButton from "./signUpBackButton";

export default function SignupProfile() {
  const contactMethods = useForm({
    defaultValues: {
      contact: "",
    },
    mode: "onChange",
  });

  const { getValues, watch } = contactMethods;

  const { profileAtferJoin } = useProfileAfterJoin();
  const [description, handleChangeDescriptikon] = useInputText("", TEXT_LIMIT.PROFILE_DESCRIPTION);
  const { categories, isCategorySelected, handleSelectCategory } = useSelectCategory();
  const navigate = useNavigate();

  const {
    hashtags,
    hashtagLength,
    hashtagInputText,
    handleAddHashtag,
    handleRemoveHashtag,
    handleChangeHashtagInputText,
  } = useHashtagInput();

  function checkIsComplete() {
    return watch("contact") !== "" || categories.length > 0 || hashtags.length > 0 || description !== "";
  }

  function handleMoveToSuccess() {
    navigate("/signup/success");
  }

  function handleCompleteProfile() {
    profileAtferJoin({
      userContact: getValues("contact"),
      userCategory: categories,
      userKeyword: hashtags,
      userIntroduction: description,
    });
  }

  return (
    <>
      <BackButtonWrapper>
        <SignUpBackButton />
      </BackButtonWrapper>
      <SignUpContainer>
        <Img src={background} alt="배경" />
        <SignupProfileSkipIcon onClick={handleMoveToSuccess} />
        <UploadButton type="button" isComplete={checkIsComplete()} onClick={handleCompleteProfile}>
          <SignupProfileCompleteTextIcon />
        </UploadButton>
        <StepBox>
          <ProfileEditInfoWrapper>
            <ProfileContactEdit methods={contactMethods} />
            <ProfileSelectCategoryEdit
              isCategorySelected={isCategorySelected}
              handleSelectCategory={handleSelectCategory}
            />
            <ProfileHashtagEdit
              hashtags={hashtags}
              hashtagLength={hashtagLength}
              hashtagInputText={hashtagInputText}
              handleAddHashtag={handleAddHashtag}
              handleRemoveHashtag={handleRemoveHashtag}
              handleChangeHashtagInputText={handleChangeHashtagInputText}
            />
            <ProfileDescriptionEdit
              description={description}
              handleChangeDescription={handleChangeDescriptikon}
              isProfile={true}
            />
          </ProfileEditInfoWrapper>
        </StepBox>
      </SignUpContainer>
      <Footer />
    </>
  );
}

const SignupProfileCompleteTextIcon = styled(SignupProfileCompleteTextIc)`
  width: 19.1062rem;
  height: 2.664rem;
`;

const UploadButton = styled.button<{ isComplete: boolean }>`
  width: 35.2rem;
  height: 7rem;
  border-radius: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: 45rem 0 0 32rem;
  background-color: ${({ isComplete, theme }) => (isComplete ? theme.colors.main : theme.colors.gray3)};

  cursor: pointer;
`;

const SignupProfileSkipIcon = styled(SignupProfileSkipIc)`
  width: 26.7rem;
  height: 6.5rem;
  margin: 26rem 0 0 48rem;
  position: absolute;

  cursor: pointer;
`;

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const Img = styled.img`
  margin-top: 11rem;
  position: absolute;
  width: 192rem;
  height: 98rem;
`;

const SignUpContainer = styled.div`
  width: 192rem;
  height: 98rem;
`;

const StepBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  right: 18.1rem;

  width: 77.9rem;
  height: 88.8rem;

  margin-left: 10rem;

  backdrop-filter: blur(1rem);

  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);

  background-origin: border-box;
  background-clip: content-box, border-box;
`;

export const ProfileEditContainerBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 148rem;

  margin-left: 21.8rem;
  margin-bottom: 4rem;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 67.7rem;
  height: 88.8rem;

  border: 0.3rem solid transparent;
  border-radius: 5rem;

  backdrop-filter: blur(1rem);
  background-color: rgba(20, 21, 23, 0.6);
  background-image: linear-gradient(rgba(13, 14, 17, 0.9), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent 0%, #3e4045 100%);
  background-origin: border-box;
  background-clip: content-box, border-box;

  align-items: center;
`;

export const ProfileEditInfoWrapper = styled.div`
  margin-top: 8.9rem;
`;

export const ProfileEditTitle = styled(ProfileContainer)``;

export const ProfileEditInfo = styled(ProfileContainer)`
  width: 77.9rem;
`;
