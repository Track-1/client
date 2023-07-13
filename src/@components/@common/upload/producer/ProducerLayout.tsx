import styled from "styled-components";
import ProducerUploadImage from "./ProducerUploadImage";
import { PropsWithChildren } from "react";

export default function ProducerLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <Container>
      <UploadImage>
        <ProducerUploadImage />
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
