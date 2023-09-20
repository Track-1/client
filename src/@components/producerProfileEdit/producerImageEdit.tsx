import styled, { css } from "styled-components";
import { UploadFileChangeIc } from "../../assets";
import UploadProducerDefaultImg from "../../assets/image/uploadProducerDefaultImg .png";
import useFileHover from "../../hooks/common/useFileHover";

interface ProducerImageEditProps {
  imageFile: File | Blob | null;
  previewImage: string | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProducerImageEdit(props: ProducerImageEditProps) {
  const { imageFile, previewImage, handleUploadImageFile } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <>
      {/* 프로듀서 프로필 이미지 업로더 */}
      <ProfileImageContainer>
        <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
          <ProfileImage
            src={previewImage === "" ? UploadProducerDefaultImg : previewImage}
            alt="썸네일 이미지"
            hoverState={true}
            imageFile={imageFile}
          />
          {imageFile && true && <FileChangeIcon />}
          <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={handleUploadImageFile} readOnly />
        </Label>
      </ProfileImageContainer>
    </>
  );
}

const FileChangeIcon = styled(UploadFileChangeIc)`
  width: 18.9rem;
  position: absolute;
  top: 47.95rem;
  left: 42.8rem;
  cursor: pointer;
  z-index: 999900;

  background-color: orange;
`;

const ProfileImageContainer = styled.label`
  display: flex;
  position: relative;

  width: 36.8rem;
  height: 36.8rem;

  margin-top: 17.8rem;
  margin-bottom: 7.6rem;

  border-radius: 50%;

  align-items: center;
  justify-content: center;

  overflow: hidden;
  cursor: pointer;
`;

const ProfileImage = styled.img<{ hoverState: boolean; imageFile: File | Blob | null }>`
  width: 100%;
  height: 100%;

  margin: auto;

  transform: translate(50, 50);
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

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;
