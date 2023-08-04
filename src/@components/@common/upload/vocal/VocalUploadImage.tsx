import styled, { css } from "styled-components";
import { UploadFileChangeIc } from "../../../../assets";
import UploadVocalDefaultImg from "../../../../assets/image/uploadVocalDefaultImg.png";
import useUploadImageFile from "../../../../hooks/common/useUploadImageFile";
import useFileHover from "../../../../hooks/common/useFileHover";

export default function VocalUploadImage() {
  const { imageFile, previewImage, uploadImageFile } = useUploadImageFile();
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <Container>
      <VocalImageFrame onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
        <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
          <VocalUploadImageLayout
            src={previewImage === "" ? UploadVocalDefaultImg : previewImage}
            alt="썸네일 이미지"
            fileHoverState={fileHoverState} //기능 변경해야됨
          />
          {imageFile && fileHoverState && <FileChangeIcon />}
          <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={uploadImageFile} readOnly />
        </Label>
      </VocalImageFrame>
    </Container>
  );
}

const Container = styled.section`
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

const VocalUploadImageLayout = styled.img<{ fileHoverState: boolean }>`
  width: 59.8rem;
  height: 59.8rem;

  margin-left: -7.4rem;
  margin-top: -7.4rem;

  transform: rotate(-45deg);
  object-fit: cover;

  ${(props) =>
    props.fileHoverState
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
  position: absolute;
  top: 14rem;
  left: 12rem;

  width: 18.9rem;

  transform: rotate(-45deg);
  cursor: pointer;
`;

const Label = styled.label`
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;
