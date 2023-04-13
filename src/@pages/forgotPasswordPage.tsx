import styled from "styled-components";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import ForgotPasswordInput from "../@components/forgotPassword/forgotPasswordInput";
import BackButton from "../@components/@common/backButton";
import Footer from "../@components/@common/footer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { ForgotPasswordToken } from "../recoil/forgotPasswordToken";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const token = useRecoilValue(ForgotPasswordToken);
  console.log(token);

  function movePreviousPage() {
    navigate(-1);
  }
  return (
    <>
      <BackButtonWrapper onClick={movePreviousPage}>
        <BackButton />
      </BackButtonWrapper>
      <ForgotPasswordInput />
      <BackgroundImg src={subBackgroundImg} alt="배경사진" />
      <Footer />
    </>
  );
}

const BackButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  width: 192rem;
  margin-top: 19.6rem;
`;
