import styled from "styled-components";
import UploadTitle from "./uploadTitle";
import UploadInfo from "./uploadInfo";

export default function UploadData() {
  //커스텀 훅
  return (
    <Container>
      <UploadTitle />
      <UploadInfo />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
