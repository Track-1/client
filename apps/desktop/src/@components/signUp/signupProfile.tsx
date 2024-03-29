import Footer from "../@common/footer";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { SignupProfileCompleteTextIc, SignupProfileSkipIc } from "../../assets";
import background from "../../assets/icon/signupProfileBackgroundIc.svg";
import useConventionModal from "../../hooks/common/useConventionModal";
import { useProfileAfterJoin } from "../../hooks/queries/user";
import ConventionModal from "../@common/conventionModal";
import ProfileDescriptionEdit from "../profileEdit/profileDescriptionEdit";
import ProfileHashtagEdit from "../profileEdit/profileHashtagEdit";
import SignUpBackButton from "./signUpBackButton";
import ProfileContact from "../@common/profileContact";
import ProfileSelectCategoryEdit from "../profileEdit/profileSelectCategoryEdit";

export default function SignupProfile() {
  const methods = useForm({
    defaultValues: {
      contact: "",
      category: [],
      hashtag: [""],
      description: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isDirty },
    handleSubmit,
  } = methods;
  const { conventionModalInform } = useConventionModal();
  const { profileAtferJoin } = useProfileAfterJoin();
  const navigate = useNavigate();

  function handleMoveToSuccess() {
    navigate("/signup/success");
  }

  return (
    <FormProvider {...methods}>
      <form>
        {conventionModalInform?.isOpen && <ConventionModal />}
        <BackButtonWrapper>
          <SignUpBackButton />
        </BackButtonWrapper>
        <SignUpContainer>
          <Img src={background} alt="배경" />
          {isDirty ? (
            <UploadButton
              isComplete={isDirty}
              onClick={handleSubmit(({ contact, category, hashtag, description }) =>
                profileAtferJoin({
                  userContact: contact,
                  userCategory: category,
                  userKeyword: hashtag.length > 0 ? hashtag.filter((item) => item.length > 0) : [],
                  userIntroduction: description,
                }),
              )}
              type="button">
              <SignupProfileCompleteTextIcon />
            </UploadButton>
          ) : (
            <SignupProfileSkipIcon onClick={handleMoveToSuccess} />
          )}
          <StepBox>
            <ProfileEditInfoWrapper>
              <ProfileContact />
              <ProfileSelectCategoryEdit />
              <ProfileHashtagEdit />
              <ProfileDescriptionEdit />
            </ProfileEditInfoWrapper>
          </StepBox>
        </SignUpContainer>
        <Footer />
      </form>
    </FormProvider>
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
