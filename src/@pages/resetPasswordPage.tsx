import ResetPasswordInput from "../@components/resetPassword/resetPasswordInput";
import { validateResetPasswordToken } from "../core/api/validateResetPasswordToken";
import { useQuery } from "react-query";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import styled from "styled-components";
import { TrackOneMainLogoIc } from "../assets";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const { isSuccess } = useQuery("validateToken", validateResetPasswordToken);
  const navigate = useNavigate();

  function moveToHome() {
    navigate("/");
  }

  return (
    <>
      {isSuccess && (
        <>
          <LogoWrapper>
            <TrackOneMainLogoIc style={{ cursor: "pointer" }} onClick={moveToHome} />
          </LogoWrapper>
          <ResetPasswordInput />
          <BackgroundImg src={subBackgroundImg} alt="배경사진" />
          {/* <Footer /> */}
        </>
      )}
    </>
  );
}

const LogoWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  margin-top: 19.6rem;
`;
