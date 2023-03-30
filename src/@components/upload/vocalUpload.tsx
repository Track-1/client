import React, { useState } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "./uploadInfo";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import VocalUploadFrameIc from "../../assets/icon/vocalUploadFrameIc.svg";
import { FileChangeIc } from "../../assets";
import { uploadImage } from "../../utils/uploadPage/uploadImage";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";
import useHover from "../../utils/hooks/useHover";
import { currentUser } from "../../core/constants/userType";

interface propsType {
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
}

export default function VocalUpload(props: propsType) {
  const { uploadData, setUploadData } = props;

  const [vocalUploadImg, setVocalUploadImg] = useState<string>(VocalUploadDefaultImg);
  const { hoverState, changeHoverState } = useHover();

  return (
    <Container>
      <SectionWrapper>
        <VocalImageBox>
          <VocalImageFrame
            onMouseEnter={(e) => changeHoverState(e, vocalUploadImg)}
            onMouseLeave={(e) => changeHoverState(e, vocalUploadImg)}>
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              <VocalUploadImage src={vocalUploadImg} alt="썸네일이미지" hoverState={hoverState} />
            </label>
            <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
              {hoverState && ( 
                <FileChangeIcon
                  onMouseEnter={(e) => changeHoverState(e, vocalUploadImg)}
                  onMouseLeave={(e) => changeHoverState(e, vocalUploadImg)}
                />
              )}
            </label>
          </VocalImageFrame>
        </VocalImageBox>
        <input
          type="file"
          id="imageFileUpload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={(e) => uploadImage(e, setVocalUploadImg, setUploadData)}
          readOnly
        />

        <UploadInfo uploadData={uploadData} setUploadData={setUploadData} whom={currentUser.VOCAL}/>
      </SectionWrapper>
      <Img src={VocalUploadFrameIc} alt="배경" />
    </Container>
  );
}

const Container = styled.section`
  //height: 76.2rem;

  margin-left: 15rem;
`;

const SectionWrapper = styled.div`
  height: 76.2rem;

  margin-top: 8rem;
  display: flex;
  align-items: center;

  position: absolute;
  z-index: 2;
  //top: 5.5rem;
  /* background-image: url(${VocalUploadFrameIc});
  background-repeat: no-repeat; */
`;

const VocalImageBox = styled.div`
  width: 59.8rem;

  display: flex;
  align-items: center;
  transform: rotate(0deg);
 // margin-top: 7.2rem;
  margin-left: 7.3rem;
  margin-right: 7.5rem;
`;

const Img = styled.img`
  position: absolute;

  width: 185rem;
  height: 74.6rem;
  margin-top: 7.5rem;
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

const VocalUploadImage = styled.img<{ hoverState: boolean }>`
  width: 59.8rem;
  height: 59.8rem;
  transform: rotate(-45deg);
  margin-left: -7.4rem;
  margin-top: -7.4rem;
  object-fit: cover;
  ${(props) =>
    props.hoverState
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
  width: 18.9rem;
  position: absolute;
  top: 14rem;
  left: 12rem;
  transform: rotate(-45deg);
  cursor: pointer;
`;

