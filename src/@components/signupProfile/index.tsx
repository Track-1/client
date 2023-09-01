import styled from "styled-components";
import background from "../../assets/icon/signupBackgroundIc.svg";
import useConventionModal from "../../hooks/common/useConventionModal";
import ConventionModal from "../@common/conventionModal";
import Footer from "../@common/footer";
import SignUpBackButton from "../signUp/signUpBackButton";
import ContactInput from "../@common/profileEdit/contactInput";

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
        <StepBox>
          <ContactInput />
        </StepBox>
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
