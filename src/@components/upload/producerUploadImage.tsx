import styled, { css } from "styled-components";
import { UploadFileChangeIc } from "../../assets";
import UploadProducerDefaultImg from "../../assets/image/uploadProducerDefaultImg .png";
// import { useState } from "react";
// import { uploadImage } from "../../utils/uploadPage/uploadImage";

export default function ProducerUploadImage() {
  //changeHoverState 적용하기
  // const [producerUploadImg, setproducerUploadImg] = useState<string>(UploadProducerDefaultImg);

  return (
    <Container>
      <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
        <TrackUploadImage
          src={UploadProducerDefaultImg}
          alt="썸네일 이미지"
          hoverState={false} //기능 변경해야됨
        />
      </label>
      <label htmlFor="imageFileUpload" style={{ cursor: "pointer" }}>
        {
          true && <FileChangeIcon /> //hoverState 기능추가해야됨
        }
      </label>
      <input
        type="file"
        id="imageFileUpload"
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
        // onChange={(e) => uploadImage(e, setTrackUploadImg, setUploadData)}
        onChange={(e) => alert("업로드 기능구현해야됨")}
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

const FileChangeIcon = styled(UploadFileChangeIc)`
  width: 18.9rem;
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;
