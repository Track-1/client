import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import { uploadVocalJacketImage } from "../../recoil/upload";
import { useRecoilState } from "recoil";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import VocalUploadFrameIc from "../../assets/icon/vocalUploadFrameIc.svg";
import { FileChangeIc } from "../../assets";

export default function VocalUpload() {
  const [vocalUploadImg, setVocalUploadImg] = useState<string>(VocalUploadDefaultImg);
  const [vocalJacketImage, setVocalJacketImage] = useRecoilState<File>(uploadVocalJacketImage);
  const [isHover, setIsHover] = useState<boolean>(false);

  function setHover(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    if (vocalUploadImg !== VocalUploadDefaultImg) {
      e.type === "mouseenter" ? setIsHover(true) : setIsHover(false);
    }
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length === 0) {
      if (vocalUploadImg === VocalUploadDefaultImg) {
        setVocalUploadImg(VocalUploadDefaultImg);
      } else {
        return;
      }
    }

    if (e.target.files !== null) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setVocalUploadImg(fileUrl);
      setVocalJacketImage(e.target.files[0]);
    }
  }

  async function convertURLtoFile(url: string) {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  }

  useEffect(() => {
    convertURLtoFile("../assets/image/vocalUploadDefaultImg.png").then((data) => {
      setVocalJacketImage(data);
    });
  }, []);

  return (
    <Container>
      <SectionWrapper>
        <VocalImageBox>
          <VocalImageFrame onMouseEnter={setHover} onMouseLeave={setHover}>
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              <VocalUploadImage src={vocalUploadImg} alt="썸네일이미지" isHover={isHover} />
            </label>
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              {isHover && <FileChangeIcon onMouseEnter={setHover} onMouseLeave={setHover} />}
            </label>
          </VocalImageFrame>
        </VocalImageBox>
        <input
          type="file"
          id="imageFileUpload"
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
  object-fit: cover;
`;

const VocalUploadImage = styled.img<{ isHover: boolean }>`
  width: 59.8rem;
  height: 59.8rem;
  transform: rotate(-45deg);
  margin-left: -7.4rem;
  margin-top: -7.4rem;
  object-fit: cover;
  ${(props) =>
    props.isHover
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

const FileChangeIcon = styled(FileChangeIc)`
  position: absolute;
  top: 17rem;
  left: 12rem;
  transform: rotate(-45deg);
  cursor: pointer;
`;
