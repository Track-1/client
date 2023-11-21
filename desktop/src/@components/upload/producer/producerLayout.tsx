import styled, { css } from "styled-components";
import { ReactNode } from "react";
import { UploadFileChangeIc } from "../../../assets";
import UploadProducerDefaultImg from "../../../assets/image/uploadProducerDefaultImg.png";
import useFileHover from "../../../hooks/common/useFileHover";

interface ProducerLayoutProps {
  previewImage: string | ArrayBuffer | null;
  handleUploadImageFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: ReactNode;
}

export default function ProducerLayout(props: ProducerLayoutProps) {
  const { previewImage, handleUploadImageFile, children } = props;
  const { fileHoverState, changeFileHoverState } = useFileHover(previewImage);

  return (
    <Container>
      <UploadImage>
        <ProducerUploadImageContainer>
          <Label onMouseEnter={changeFileHoverState} onMouseLeave={changeFileHoverState}>
            <ProducerUploadImageLayout
              src={previewImage === "" ? UploadProducerDefaultImg : previewImage}
              alt="썸네일 이미지"
              fileHoverState={fileHoverState}
              previewImage={previewImage}
            />
            {previewImage && fileHoverState && <FileChangeIcon />}
            <FileInput type="file" accept=".jpg,.jpeg,.png" onChange={handleUploadImageFile} readOnly />
          </Label>
        </ProducerUploadImageContainer>
      </UploadImage>
      {children}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  align-items: center;

  width: 171rem;
  height: 74.7rem;

  border: 0.2rem solid transparent;
  border-top-left-radius: 37.8rem;
  border-bottom-left-radius: 37.8rem;
  background-image: linear-gradient(${({ theme }) => theme.colors.sub3}, ${({ theme }) => theme.colors.sub3}),
    linear-gradient(to right, ${({ theme }) => theme.colors.sub1}, ${({ theme }) => theme.colors.sub3});
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const UploadImage = styled.div`
  width: 71.9rem;
`;

const ProducerUploadImageContainer = styled.div`
  display: flex;
  justify-content: center;

  margin-left: 6.5rem;
  margin-right: 4.9rem;

  border-radius: 50%;

  overflow: hidden;
  cursor: pointer;
`;

const ProducerUploadImageLayout = styled.img<{ fileHoverState: boolean; previewImage: string | ArrayBuffer | null }>`
  position: relative;

  width: 60.4rem;
  height: 60.4rem;
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

const Label = styled.label`
  cursor: pointer;
`;

const FileChangeIcon = styled(UploadFileChangeIc)`
  position: absolute;

  top: 50.9rem;
  left: 37.8rem;

  width: 18.9rem;

  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;
