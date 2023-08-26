import styled from "styled-components";
import uploadAbleBtnImg from "../../assets/image/uploadAbleBtnImg.png";
import uploadUnableBtnImg from "../../assets/image/uploadUnableBtnImg.png";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UploadData } from "../../recoil/upload/uploadData";
import BackButton from "../@common/backButton";
import useProducerUpload from "../../hooks/queries/upload/useProducerUpload";
import useUploadValue from "../../hooks/common/useUploadValue";
import { UPLOAD_TYPE } from "../../core/common/uploadType";

interface UploadHeaderProps {
  initEmptyData: boolean;
}

export default function UploadHeader(props: UploadHeaderProps) {
  const { initEmptyData } = props;
  const { uploadType } = useUploadValue(initEmptyData);
  const uploadData = useRecoilValue(UploadData);

  const [isUploadActive, setIsUploadActive] = useState(false);

  function isActive() {
    return uploadData.trackAudioFile && uploadData.trackTitle;
  }

  const [upload] = useProducerUpload(uploadType);

  function handleUploadData() {
    isUploadActive && upload();
  }

  useEffect(() => {
    isActive() ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [uploadData]);

  return (
    <Container>
      <BackButton />
      <Wrapper>
        <UploadTypeText>{uploadType === UPLOAD_TYPE.VOCAL_SEARCHING ? "Vocal Searching" : "Portfolio"}</UploadTypeText>
        {isUploadActive ? (
          <UploadAbleBtn src={uploadAbleBtnImg} alt="업로드 버튼" onClick={handleUploadData} />
        ) : (
          <img src={uploadUnableBtnImg} alt="업로드 버튼" />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  align-items: center;

  height: 17rem;

  padding: 0 7.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const UploadTypeText = styled.div`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.id};
`;

const UploadAbleBtn = styled.img`
  cursor: pointer;
`;
