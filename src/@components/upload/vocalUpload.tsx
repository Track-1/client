import { useState } from "react";
import styled from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import VocalUploadFrameIc from "../../assets/icon/vocalUploadFrameIc.svg";
import Test from "../../assets/image/test.png";

export default function VocalUpload() {
  const [vocalUploadImg, setVocalUploadImg] = useState<string>(VocalUploadDefaultImg);

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      if (vocalUploadImg === VocalUploadDefaultImg) {
        setVocalUploadImg(VocalUploadDefaultImg);
      } else {
        return;
      }
    }

    if (e.target.files !== null) {
      const file = e.target.files as FileList;
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setVocalUploadImg(fileUrl);
    }
  }

  return (
    <Container>
      <SectionWrapper>
        <VocalImageBox>
          <VocalImageFrame>
            <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
              <VocalUploadImage src={vocalUploadImg} alt="썸네일이미지" />
            </label>
          </VocalImageFrame>
        </VocalImageBox>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={uploadImage}
          readOnly
        />

        <UploadInfo />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 76.2rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;

  display: flex;
  align-items: center;

  background-image: url(${VocalUploadFrameIc});
  background-repeat: no-repeat;
`;

const VocalImageBox = styled.div`
  width: 59.8rem;

  display: flex;
  align-items: center;
  transform: rotate(0deg);
  margin-left: 7.3rem;
  margin-right: 7.5rem;
`;

const VocalImageFrame = styled.div`
  height: 45.1rem;
  width: 45.1rem;

  margin-left: 7.8rem;
  margin-bottom: 2rem;
  border-radius: 5rem;
  transform: rotate(45deg);
  overflow: hidden;
`;

const VocalUploadImage = styled.img`
  width: 59.8rem;
  height: 59.8rem;
  transform: rotate(-45deg);
  object-fit:cover
  margin-left: -7.4rem;
  margin-top: -7.4rem;
`;
