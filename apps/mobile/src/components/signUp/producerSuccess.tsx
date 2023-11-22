import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  SignUpGetStartedButtonIc,
  SignUpProducerButtonIc,
  SignUpProducerQuestionIc,
  SignUpSuccessBackgroundIc,
} from "../../assets";

import ProducerUploadModal from "./producerUploadModal";
import useModal from "../../hooks/common/useModal";
import { useEffect } from "react";

export default function ProducerSuccess() {
  const { openModal, unShowModal, handleShowUpdateModal } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    unShowModal();
  }, []);

  function handleMoveToHome() {
    navigate("/");
  }

  return (
    <SuccessPageContainer>
      <SignUpSuccessBackgroundIcon />

      <SuccessPageWrapper>
        <SignUpGetStartedButtonIcon onClick={handleMoveToHome} />
        <UploadButtonWrapper>
          <SignUpProducerQuestionIcon />
          <UploadButton>
            <SignUpProducerButtonIcon onClick={handleShowUpdateModal} />
          </UploadButton>
        </UploadButtonWrapper>

        {openModal && <ProducerUploadModal />}
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

const SignUpProducerQuestionIcon = styled(SignUpProducerQuestionIc)`
  width: 50.6rem;
`;

const SignUpProducerButtonIcon = styled(SignUpProducerButtonIc)`
  width: 55.5rem;
  height: 6.7rem;
`;
