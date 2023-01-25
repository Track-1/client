import React, { useState } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import { uploadTrackJacketImage, defaultImageState } from "../../recoil/upload";
import { useRecoilState } from "recoil";
import TrackUploadDefaultImg from "../../assets/image/trackUploadDefaultImg.png";
import { FileChangeIc } from "../../assets";
import { isMouseEnter } from "../../utils/common/eventType";
import { uploadImage, isDefaultImage } from "../../utils/uploadPage/uploadImage";
export default function TrackUpload() {
  const [trackUploadImg, setTrackUploadImg] = useState<string>(TrackUploadDefaultImg);
  const [tarckJacketImage, setTrackJacketImage] = useRecoilState<File | Blob>(uploadTrackJacketImage);
  const [defaultState, setDefaultState] = useRecoilState<boolean>(defaultImageState);
  const [isHover, setIsHover] = useState<boolean>(false);

  function setHover(e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) {
    if (isDefaultImage(trackUploadImg)) {
      isMouseEnter(e) ? setIsHover(true) : setIsHover(false);
    }
  }

  function uploadImageFile(e: React.ChangeEvent<HTMLInputElement>) {
    uploadImage(e, setTrackUploadImg, setTrackJacketImage, setDefaultState);
  }
  return (
    <Container>
      <SectionWrapper>
        <TrackImageBox>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            <TrackUploadImage
              src={trackUploadImg}
              alt="트랙이미지"
              onMouseEnter={setHover}
              onMouseLeave={setHover}
              isHover={isHover}
            />
          </label>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            {isHover && <FileChangeIcon onMouseEnter={setHover} onMouseLeave={setHover} />}
          </label>
        </TrackImageBox>
        <input
          type="file"
          id="imageFileUpload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={uploadImageFile}
          readOnly
        />
        <UploadInfo />
      </SectionWrapper>
    </Container>
  );
}

const Container = styled.section`
  height: 76.2rem;
  width: 171rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 100%;
  /* width: 138.2rem; */

  display: flex;
  align-items: center;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const TrackImageBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 50%;
  margin-left: 6.5rem;
  margin-right: 4.9rem;
  overflow: hidden;
  cursor: pointer;
`;

const TrackUploadImage = styled.img<{ isHover: boolean }>`
  width: 60.4rem;
  height: 60.4rem;
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
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;
