import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SignUpGetStartedButtonIc,
  SignUpProducerButtonIc,
  SignUpProducerQuestionIc,
  SignUpSuccessBackgroundIc,
} from "../../assets";

export default function ProducerSuccess() {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleMoveToHome() {
    navigate("/");
  }
  function handleOpenProducerUploadModal() {
    setVisible(true);
  }

  return (
    <SuccessPageContainer>
      <SignUpSuccessBackgroundIcon />

      <SuccessPageWrapper>
        <SignUpGetStartedButtonIcon onClick={handleMoveToHome} />
        <UploadButtonWrapper>
          <SignUpProducerQuestionIcon />
          <UploadButton>
            <SignUpProducerButtonIcon onClick={handleOpenProducerUploadModal} />
          </UploadButton>
        </UploadButtonWrapper>

        {/* {visible && <ProducerUploadModal visible={visible} setVisible={setVisible} />} */}
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
  margin-top: 1rem;
  cursor: pointer;
`;

const ModalWrapper = styled.section`
  display: flex;
  flex-direction: column;

  margin: 2.5rem 0 0 13.6rem;

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

const SignUpProducerQuestionIcon = styled(SignUpProducerQuestionIc)`
  width: 50.6rem;
`;

const SignUpProducerButtonIcon = styled(SignUpProducerButtonIc)`
  width: 55.5rem;
`;
