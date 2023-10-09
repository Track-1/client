import styled, { css } from "styled-components";
import UploadVocalDefaultImg from "../../../assets/image/uploadVocalDefaultImg.png";
import { FileInput, Label } from "../producerProfileEdit/producerImageEdit";
import useFileHover from "../../../hooks/common/useFileHover";
import { UploadFileChangeIc } from "../../../assets";

interface VocalImageEditProps {
  previewImage: string | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function VocalImageEdit(props: VocalImageEditProps) {
  const { previewImage, handleUploadImageFile } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <>
      <ProfileImageContainer>
        <ImageWrapper onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
          <Label>
            <ProfileImage
              src={previewImage === "" ? UploadVocalDefaultImg : previewImage}
              alt="썸네일 이미지"
              fileHoverState={fileHoverState}
              previewImage={previewImage}
            />
            {previewImage && fileHoverState && <FileChangeIcon />}
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

const ProfileImage = styled.img<{ fileHoverState: boolean; previewImage: string | null }>`
  width: 37.9rem;
  height: 37.9rem;

  margin: auto;

  object-fit: cover;

  transform: rotate(45deg);

  transform: translate(50, 50);
  object-fit: cover;
  border-radius: 50%;
  ${(props) =>
    props.fileHoverState && props.previewImage !== ""
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

  top: 9.6rem;
  left: 5.3rem;

  width: 18.9rem;

  transform: rotate(45deg);

  cursor: pointer;
`;
