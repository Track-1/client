import ResetPasswordInput from "../@components/resetPassword/resetPasswordInput";
import { validateResetPasswordToken } from "../core/api/validateResetPasswordToken";
import { useQuery } from "react-query";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import styled from "styled-components";
import { TrackOneMainLogoIc } from "../assets";
import useMovePage from "../utils/hooks/useMovePage";
import Footer from "../@components/@common/footer";
import Loading from "../@components/@common/loading";
import { useParams } from "react-router-dom";

export default function ResetPasswordPage() {
  const { token } = useParams();

  const { isSuccess, isLoading } = useQuery("validateToken", () => validateResetPasswordToken(token), {
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
      {isLoading && <Loading />}
      {isSuccess && (
        <>
          <LogoWrapper>
            <TrackOneMainLogoIcon style={{ cursor: "pointer" }} onClick={moveToHome} />
          </LogoWrapper>
          <ResetPasswordInput />
          <BackgroundImg src={subBackgroundImg} alt="배경사진" />
          <Footer />
        </>
      )}
    </>
  );
}

const TrackOneMainLogoIcon = styled(TrackOneMainLogoIc)`
  width: 26.3rem;
  margin: -0.05rem 0 0 -0.4rem;
  cursor: pointer;
`;

const LogoWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  width: 192rem;
  margin-top: 19.6rem;
`;
