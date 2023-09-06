import styled from "styled-components";
import { SkipBtnSignupIc, WelcomeSignupProfileIc } from "../../assets";
import background from "../../assets/icon/signupProfileBackgroundIc.svg";
import useConventionModal from "../../hooks/common/useConventionModal";
import ConventionModal from "../@common/conventionModal";
import Footer from "../@common/footer";
import ProfileEditBox from "../@common/profileEdit/profileEditBox";
import SignUpBackButton from "../signUp/signUpBackButton";

export default function SignupProfile() {
  const { conventionModalInform } = useConventionModal();

  return (
    <>
      {conventionModalInform?.isOpen && <ConventionModal />}
      <BackButtonWrapper>
        <SignUpBackButton />
      </BackButtonWrapper>
      <WelcomeSignupProfileIcon />
      <SkipBtnSignupIcon />
      <SignUpContainer>
        <Img src={background} alt="배경" />
        <ProfileEditBox />
      </SignUpContainer>
      <Footer />
    </>
  );
}

const WelcomeSignupProfileIcon = styled(WelcomeSignupProfileIc)`
  position: absolute;
  width: 35.1rem;

  margin: 35.8rem 0 0 32.1rem;
`;

const SkipBtnSignupIcon = styled(SkipBtnSignupIc)`
  position: absolute;
  width: 35.2rem;

  margin: 48.2rem 0 0 32.1rem;

  cursor: pointer;
`;

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const SignUpContainer = styled.div`
  width: 192rem;
  height: 98rem;
`;

const Img = styled.img`
  position: absolute;
  width: 192rem;
  height: 98rem;
`;
