import styled from "styled-components";
import ProducerLayout from "./producerLayout";
import UploadData from "./uploadData";

export default function UploadBody() {
  return (
    <Container>
      <ProducerLayout>
        <UploadData />
      </ProducerLayout>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
