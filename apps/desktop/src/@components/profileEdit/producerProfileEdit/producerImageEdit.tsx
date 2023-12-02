import styled, { css } from "styled-components";
import { UploadFileChangeIc } from "../../../assets";
import UploadProducerDefaultImg from "../../../assets/image/uploadProducerDefaultImg.png";
import useFileHover from "../../../hooks/common/useFileHover";

interface ProducerImageEditProps {
  previewImage: string | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProducerImageEdit(props: ProducerImageEditProps) {
  const { previewImage, handleUploadImageFile } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover();

  return (
    <>
      <ProfileImageContainer>
        <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
          <ProfileImage
            src={previewImage === "" ? UploadProducerDefaultImg : previewImage}
            alt="썸네일 이미지"
            fileHoverState={fileHoverState}
            previewImage={previewImage}
          />
          {fileHoverState && <FileChangeIcon />}
          <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={handleUploadImageFile} readOnly />
        </Label>
      </ProfileImageContainer>
    </>
  );
}

const FileChangeIcon = styled(UploadFileChangeIc)`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 18.9rem;

  cursor: pointer;
`;

const ProfileImageContainer = styled.div`
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

const ProfileImage = styled.img<{ fileHoverState: boolean; previewImage: string | null }>`
  width: 36.8rem;
  height: 36.8rem;

  margin: auto;

  transform: translate(50, 50);
  object-fit: cover;
  border-radius: 50%;
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

export const FileInput = styled.input`
  display: none;
`;

export const Label = styled.label`
  cursor: pointer;
`;
