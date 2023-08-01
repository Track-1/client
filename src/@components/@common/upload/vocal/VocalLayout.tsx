import { ReactNode } from "react";
import styled from "styled-components";
import VocalUploadImage from "./VocalUploadImage";
import UploadVocalLayoutImg from "../../../../assets/image/uploadVocalLayoutImg.png";

interface VocalLayoutProps {
  children: ReactNode;
}

export default function VocalLayout(props: VocalLayoutProps) {
  const { children } = props;
  return (
    <Container>
      <UploadImageContainer>
        <VocalUploadImage />
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

  width: 74.6rem;
  height: 100%;

  margin-top: 7.5rem;
`;

const UploadInfoContainer = styled.div`
  z-index: 1;

  width: 100%;
  height: 100%;
`;
