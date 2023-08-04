import { PropsWithChildren } from "react";
import styled from "styled-components";

export default function UploadInfoBox(props: PropsWithChildren) {
  const { children } = props;
  return <Container>{children}</Container>;
}

const Container = styled.div`
  display: flex;

  width: 100%;
  height: 6rem;

  margin-bottom: 0.2rem;
`;
