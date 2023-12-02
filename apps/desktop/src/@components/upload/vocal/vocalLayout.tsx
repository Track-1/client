import { ReactNode } from "react";
import styled, { css } from "styled-components";
import UploadVocalDefaultImg from "../../../assets/image/uploadVocalDefaultImg.png";
import UploadVocalLayoutImg from "../../../assets/image/uploadVocalLayoutImg.png";
import { UploadFileChangeIc } from "../../../assets";
import useFileHover from "../../../hooks/common/useFileHover";

interface VocalLayoutProps {
  previewImage: string | ArrayBuffer | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

export default function VocalLayout(props: VocalLayoutProps) {
  const { previewImage, handleUploadImageFile, children } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover();
  return (
    <Container>
      <UploadImageContainer>
        <VocalUploadImageContainer>
          <VocalImageFrame onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
            <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
              <VocalUploadImageLayout
                src={previewImage === "" ? UploadVocalDefaultImg : previewImage}
                alt="썸네일 이미지"
                fileHoverState={fileHoverState} //기능 변경해야됨
              />
              {previewImage && fileHoverState && <FileChangeIcon />}
              <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={handleUploadImageFile} readOnly />
            </Label>
          </VocalImageFrame>
        </VocalUploadImageContainer>
      </UploadImageContainer>
      <UploadInfoContainer>{children}</UploadInfoContainer>
      <UploadVocalLayout src={UploadVocalLayoutImg} />
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;

  width: 171rem;
  height: 74.7rem;
`;

const UploadVocalLayout = styled.img`
  position: absolute;

  width: 185rem;
  height: 74.6rem;

  margin-top: 7.5rem;
`;

const UploadImageContainer = styled.div`
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 75.5rem;
  height: 100%;

  margin-top: 7.5rem;
`;

const UploadInfoContainer = styled.div`
  z-index: 1;

  width: 89.6rem;
  height: 100%;
`;

const VocalUploadImageContainer = styled.section`
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
  top: 19rem;
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
