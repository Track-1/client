import ResetPasswordInput from "../@components/resetPassword/resetPasswordInput";
import { validateResetPasswordToken } from "../core/api/validateResetPasswordToken";
import { useQuery } from "react-query";
import subBackgroundImg from "../assets/image/subBackgroundImg.png";
import styled from "styled-components";
import { TrackOneMainLogoIc } from "../assets";
import useMovePage from "../utils/hooks/useMovePage";
import Footer from "../@components/@common/footer";

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

  console.log("접속")
  return (
    <>
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

const TrackOneMainLogoIcon=styled(TrackOneMainLogoIc)`
  width: 26.3rem;
`

const LogoWrapper = styled.div`
  margin: 5.9rem 0 0 7.9rem;
`;

const BackgroundImg = styled.img`
  width: 192rem;
  margin-top: 19.6rem;
`;
