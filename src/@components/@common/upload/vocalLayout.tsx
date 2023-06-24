import { ReactNode } from "react";
import styled from "styled-components";
import VocalUploadImage from "./vocalUploadImage";

interface VocalLayoutProps {
  children: ReactNode;
}

export default function VocalLayout(props: VocalLayoutProps) {
  const { children } = props;
  return (
    <>
      <Container>
        <UploadImage>
          <VocalUploadImage />
        </UploadImage>
        <UploadInfoContainer>{children}</UploadInfoContainer>
      </Container>
    </>
  );
}

const Container = styled.section`
  position: relative;

  display: flex;
  align-items: center;

  width: 171rem;
  height: 74.7rem;

  &::after {
    content: "";
    position: absolute;

    width: 55.8rem;
    height: 55.8rem;
    margin-left: 9.2rem;

    transform: rotate(45deg);

    border-radius: 5rem;
    border-bottom: 0.2rem solid ${({ theme }) => theme.colors.sub2};
    border-left: 0.2rem solid ${({ theme }) => theme.colors.sub2};
  }
`;

const UploadImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 74.6rem;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.black};
`;

const UploadInfoContainer = styled.div`
  width: 100%;
  height: 100%;

  border-top: 0.2rem solid ${({ theme }) => theme.colors.sub2};
  border-bottom: 0.2rem solid ${({ theme }) => theme.colors.sub2};
`;
