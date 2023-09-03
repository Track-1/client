import styled from "styled-components";
import uploadAbleBtnImg from "../../assets/image/uploadAbleBtnImg.png";
import uploadUnableBtnImg from "../../assets/image/uploadUnableBtnImg.png";
import BackButton from "../../@components/@common/backButton";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UploadData } from "../../recoil/upload/uploadData";

export default function ProducerProfileEditHeader() {
  const [isUploadActive, setIsUploadActive] = useState(false);

  const uploadData = useRecoilValue(UploadData);
  console.log(uploadData);

  useEffect(() => {
    uploadData.trackAudioFile && uploadData.trackTitle ? setIsUploadActive(true) : setIsUploadActive(false);
  }, [uploadData]);

  return (
    <Container>
      {/* back버튼 */}
      <Wrapper>
        <BackButton />
        {isUploadActive ? (
          <img src={uploadAbleBtnImg} alt="업로드 버튼" />
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
