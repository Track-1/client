import styled from "styled-components";
import background from "../../assets/icon/signupBackgroundIc.svg";
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
      <SignUpContainer>
        <Img src={background} alt="배경" />
        <ProfileEditBox />
      </SignUpContainer>
      <Footer />
    </>
  );
}

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
