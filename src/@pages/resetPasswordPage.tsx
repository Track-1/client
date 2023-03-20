import ResetPasswordInput from "../@components/resetPassword/resetPasswordInput";
import { validateResetPasswordToken } from "../core/api/validateResetPasswordToken";
import { useQuery } from "react-query";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import styled from "styled-components";
import { TrackOneMainLogoIc } from "../assets";
import useMovePage from "../utils/hooks/useMovePage";

export default function ResetPasswordPage() {
  const { isSuccess } = useQuery("validateToken", validateResetPasswordToken, {
    onError: (error: any) => {
      alert(error.response.data.message);
      movePage("/");
    },
  });

  const [movePage] = useMovePage();

  function moveToHome() {
    movePage("/");
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
