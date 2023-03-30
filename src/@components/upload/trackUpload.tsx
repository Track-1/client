import React, { useState } from "react";
import styled, { css } from "styled-components";
import UploadInfo from "./uploadInfo";
import TrackUploadDefaultImg from "../../assets/image/trackUploadDefaultImg.png";
import { FileChangeIc } from "../../assets";
import { uploadImage } from "../../utils/uploadPage/uploadImage";
import { UploadInfoDataType } from "../../type/uploadInfoDataType";
import useHover from "../../utils/hooks/useHover";
import { currentUser } from "../../core/constants/userType";

interface PropsType {
  uploadData: UploadInfoDataType;
  setUploadData: React.Dispatch<React.SetStateAction<UploadInfoDataType>>;
}

export default function TrackUpload(props: PropsType) {
  const { uploadData, setUploadData } = props;

  const [trackUploadImg, setTrackUploadImg] = useState<string>(TrackUploadDefaultImg);
  const { hoverState, changeHoverState } = useHover();

  return (
    <Container>
      <SectionWrapper>
        <TrackImageBox>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            <TrackUploadImage
              src={trackUploadImg}
              alt="썸네일 이미지"
              onMouseEnter={(e) => changeHoverState(e, trackUploadImg)}
              onMouseLeave={(e) => changeHoverState(e, trackUploadImg)}
              hoverState={hoverState}
            />
          </label>
          <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
            {hoverState && (
              <FileChangeIcon
                onMouseEnter={(e) => changeHoverState(e, trackUploadImg)}
                onMouseLeave={(e) => changeHoverState(e, trackUploadImg)}
              />
            )}
          </label>
        </TrackImageBox>
        <input
          type="file"
          id="imageFileUpload"
          style={{ display: "none" }}
          accept=".jpg,.jpeg,.png"
          onChange={(e) => uploadImage(e, setTrackUploadImg, setUploadData)}
          readOnly
        />
        <UploadInfo uploadData={uploadData} setUploadData={setUploadData} whom={currentUser.PRODUCER}/>
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

const TrackUploadImage = styled.img<{ hoverState: boolean }>`
  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  border-radius: 50%;
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
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;
