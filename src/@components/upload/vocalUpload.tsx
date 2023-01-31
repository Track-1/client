import React, { useState } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "../@common/uploadInfo";
import VocalUploadDefaultImg from "../../assets/image/vocalUploadDefaultImg.png";
import VocalUploadFrameIc from "../../assets/icon/vocalUploadFrameIc.svg";
import { FileChangeIc } from "../../assets";
import { uploadImage, setHover } from "../../utils/uploadPage/uploadImage";
import { UploadInfoDataType, UploadInfoRefType } from "../../type/uploadInfoDataType";
import UploadHeader from "../@common/uploadHeader";

interface propsType {
  userType: string;
  producerUploadType: string | undefined;
  uploadData: UploadInfoDataType;
  uploadDataRef: UploadInfoRefType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
  setUploadDataRef: React.Dispatch<React.SetStateAction<UploadInfoRefType>>;
}

export default function VocalUpload(props: propsType) {
  const { userType, producerUploadType, uploadData, uploadDataRef, setUploadData, setUploadDataRef } = props;

  const [vocalUploadImg, setVocalUploadImg] = useState<string>(VocalUploadDefaultImg);
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <>
      <UploadHeader
        userType={userType}
        producerUploadType={producerUploadType}
        uploadData={uploadData}
        setUploadData={setUploadData}
        uploadDataRef={uploadDataRef}
      />
      <Container>
        <SectionWrapper>
          <VocalImageBox>
            <VocalImageFrame
              onMouseEnter={(e) => setHover(e, vocalUploadImg, setIsHover)}
              onMouseLeave={(e) => setHover(e, vocalUploadImg, setIsHover)}>
              <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
                <VocalUploadImage src={vocalUploadImg} alt="썸네일이미지" isHover={isHover} />
              </label>
              <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
                {isHover && (
                  <FileChangeIcon
                    onMouseEnter={(e) => setHover(e, vocalUploadImg, setIsHover)}
                    onMouseLeave={(e) => setHover(e, vocalUploadImg, setIsHover)}
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

          <UploadInfo uploadData={uploadData} setUploadData={setUploadData} setUploadDataRef={setUploadDataRef} />
        </SectionWrapper>
      </Container>
    </>
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
