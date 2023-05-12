import styled from "styled-components";
import UploadTitle from "./uploadTitle";

export default function UploadInfo() {
  return (
    <Container>
      <UploadTitle />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
