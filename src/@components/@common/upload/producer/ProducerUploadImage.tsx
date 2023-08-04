import styled, { css } from "styled-components";
import UploadProducerDefaultImg from "../../../../assets/image/uploadProducerDefaultImg .png";
import useUploadImageFile from "../../../../hooks/common/useUploadImageFile";
import { useState } from "react";
import { UploadFileChangeIc } from "../../../../assets";

export default function ProducerUploadImage() {
  // const [producerUploadImg, setproducerUploadImg] = useState<string>(UploadProducerDefaultImg);
  const { imageFile, previewImage, uploadImageFile } = useUploadImageFile();
  const [hoverState, setHoverState] = useState(false);

  function isImageFileEmpty() {
    return imageFile === null;
  }
  function changeHoverState() {
    setHoverState(!hoverState);
  }

  return (
    <Container>
      <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
        <TrackUploadImage
          src={previewImage === "" ? UploadProducerDefaultImg : previewImage}
          alt="썸네일 이미지"
          onMouseEnter={changeHoverState}
          onMouseLeave={changeHoverState}
          hoverState={hoverState} //기능 변경해야됨
          isImageFileEmpty={isImageFileEmpty()}
        />
      </label>
      <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
        {
          imageFile && hoverState && <FileChangeIcon /> //hoverState 기능추가해야됨
        }
      </label>
      <input
        type="file"
        id="imageFileUpload"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        onChange={uploadImageFile}
        readOnly
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;

  margin-left: 6.5rem;
  margin-right: 4.9rem;

  border-radius: 50%;

  overflow: hidden;
  cursor: pointer;

  &:hover {
  }
`;

const TrackUploadImage = styled.img<{ hoverState: boolean; isImageFileEmpty: boolean }>`
  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  border-radius: 50%;
  ${(props) =>
    props.hoverState && !props.isImageFileEmpty
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

const FileChangeIcon = styled(UploadFileChangeIc)`
  width: 18.9rem;
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;
