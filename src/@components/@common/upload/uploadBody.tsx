import styled from "styled-components";
import ProducerLayout from "./producerLayout";
import UploadData from "./uploadData";
import VocalLayout from "./vocalLayout";

export default function UploadBody() {
  return (
    <Container>
      <ProducerLayout>
        <UploadData />
      </ProducerLayout>
      {/* <VocalLayout>
        <UploadData />
      </VocalLayout> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
