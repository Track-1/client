import styled from "styled-components";
import FileUploadInfo from "./FileUploadInfo";
import CategoryInfo from "./CategotyInfo";
import HashtagInfo from "./HashtagInfo";
import DescriptionInfo from "./DescriptionInfo";

export default function UploadInfo() {
  return (
    <Container>
      <FileUploadInfo />
      <CategoryInfo />
      <HashtagInfo />
      <DescriptionInfo />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  margin-top: 3.9rem;
`;
