import styled, { css } from "styled-components";
import UploadVocalDefaultImg from "../../../assets/image/uploadVocalDefaultImg.png";
import { FileChangeIcon, FileInput, Label } from "../producerProfileEdit/producerImageEdit";
import useFileHover from "../../../hooks/common/useFileHover";

interface VocalImageEditProps {
  imageFile: File | Blob | null;
  previewImage: string | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VocalImageEdit(props: VocalImageEditProps) {
  const { imageFile, previewImage, handleUploadImageFile } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <>
      <ProfileImageContainer>
        <ImageWrapper onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
          <Label>
            <ProfileImage
              src={previewImage === "" ? UploadVocalDefaultImg : previewImage}
              alt="썸네일 이미지"
              hoverState={fileHoverState}
              imageFile={imageFile}
            />
            {imageFile && fileHoverState && <FileChangeIcon />}
            <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={handleUploadImageFile} readOnly />
          </Label>
        </ImageWrapper>
      </ProfileImageContainer>
    </>
  );
}

const ProfileImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 37rem;
  height: 37rem;

  margin-top: 10rem;
  margin-bottom: 7.5rem;
`;

const ImageWrapper = styled.div`
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 28.7em;
  height: 28.7em;

  border-radius: 3rem;
  overflow: hidden;

  transform: rotate(-45deg);

  object-fit: cover;

  cursor: pointer;
`;

const ProfileImage = styled.img<{ hoverState: boolean; imageFile: File | Blob | null }>`
  width: 37.9rem;
  height: 37.9rem;

  margin: auto;

  object-fit: cover;

  transform: rotate(45deg);

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
