import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SignUpGetStartedButtonIc,
  SignUpSuccessBackgroundIc,
  SignUpVocalButtonIc,
  SignUpVocalQuestionIc,
} from "../../assets";

export default function VocalSuccess() {
  const navigate = useNavigate();

  function handelMoveToHome() {
    navigate("/");
  }

  function handleMoveToVocalUpload() {
    navigate(`/upload/vocal/portfolio`);
  }

  return (
    <SuccessPageContainer>
      <SignUpSuccessBackgroundIcon />
      <SuccessPageWrapper>
        <SignUpGetStartedButtonIcon onClick={handelMoveToHome} />
        <UploadButtonWrapper>
          <SignUpVocalQuestionIcon />
          <UploadButton>
            <SignUpVocalButtonIcon onClick={handleMoveToVocalUpload} />
          </UploadButton>
        </UploadButtonWrapper>
      </SuccessPageWrapper>
    </SuccessPageContainer>
  );
}

const SuccessPageWrapper = styled.div`
  position: absolute;

  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
`;

const SignUpGetStartedButtonIcon = styled(SignUpGetStartedButtonIc)`
  width: 55.5rem;
  margin-top: 46.7rem;

  cursor: pointer;
`;

const UploadButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-top: 9.7rem;
`;

const UploadButton = styled.div`
  margin-top: 2.5rem;
  cursor: pointer;
`;

const SignUpSuccessBackgroundIcon = styled(SignUpSuccessBackgroundIc)`
  width: 192rem;
  height: 108rem;
`;

const SuccessPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpVocalQuestionIcon = styled(SignUpVocalQuestionIc)`
  width: 51.5rem;
`;

const SignUpVocalButtonIcon = styled(SignUpVocalButtonIc)`
  width: 55.5rem;
  height: 6.7rem;
`;
