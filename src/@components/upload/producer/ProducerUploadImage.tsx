import styled, { css } from "styled-components";
import UploadProducerDefaultImg from "../../../assets/image/uploadProducerDefaultImg .png";
import useFileHover from "../../../hooks/common/useFileHover";
import useUploadImageFile from "../../../hooks/common/useUploadImageFile";
import { UploadFileChangeIc } from "../../../assets";

export default function ProducerUploadImage() {
  const { imageFile, previewImage, uploadImageFile } = useUploadImageFile();
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <Container>
      <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
        <ProducerUploadImageLayout
          src={previewImage === "" ? UploadProducerDefaultImg : previewImage}
          alt="썸네일 이미지"
          hoverState={fileHoverState}
          imageFile={imageFile}
        />
        {imageFile && fileHoverState && <FileChangeIcon />}
        <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={uploadImageFile} readOnly />
      </Label>
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

const ProducerUploadImageLayout = styled.img<{ hoverState: boolean; imageFile: File | Blob | null }>`
  width: 60.4rem;
  height: 60.4rem;
  object-fit: cover;
  border-radius: 50%;
  ${(props) =>
    props.hoverState && props.imageFile
      ? css`
          background: rgba(30, 32, 37, 0.5);
          filter: blur(3rem);
        `
      : css`
          background: default;
          filter: default;
        `}
`;

const Label = styled.label`
  cursor: pointer;
`;

const FileChangeIcon = styled(UploadFileChangeIc)`
  width: 18.9rem;
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;
